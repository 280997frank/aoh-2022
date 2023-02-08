import Button from "@/components/Atoms/Button";
import DropDown from "@/components/Atoms/Dropdown";
import FormInput from "@/components/Atoms/FormInput";
import FormRadio from "@/components/Atoms/FormRadio";
import FormTextArea from "@/components/Atoms/FormTextArea";
import MediaUpload from "@/components/Atoms/Mediaupload";
import ArrayOfImageUpload from "@/components/Molecules/ArrayOfImageUpload";
import TermAndConditionsModal, {
  ICaptureYourNSMomentsTermProps,
} from "@/components/Molecules/TermAndConditionsModal";
import { functions, storage } from "@/connections/firebase";
import {
  arrayOfMain,
  requiredEmail,
  requiredString,
} from "@/constants/validationSchema";
import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { httpsCallable } from "firebase/functions";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import { Form, Formik } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import s from "shortid";
import { object } from "yup";
import { ICaptureYourNSMomentsCategoriesProps } from "./Categories";
import ReCAPTCHA from "react-google-recaptcha";

export type formValuesType = {
  audio: string;
  caption: string;
  categoryName: string;
  email: string;
  isDonate: string;
  name: string;
  phone: string;
  rank: string;
  story: string;
  storyPictures: [
    {
      image: File | string | null;
    }
  ];
  storyPlace: string;
  title: string;
  unit: string;
  video: string;
};

const INITIAL_VALUES: formValuesType = {
  audio: "",
  caption: "",
  categoryName: "",
  email: "",
  isDonate: "1",
  name: "",
  phone: "",
  rank: "",
  story: "",
  storyPictures: [
    {
      image: "",
    },
  ],
  storyPlace: "",
  title: "",
  unit: "",
  video: "",
};

const VALIDATION_SCHEMA = object().shape({
  caption: requiredString.max(1000),
  categoryName: requiredString,
  email: requiredEmail,
  isDonate: requiredString,
  name: requiredString,
  phone: requiredString,
  rank: requiredString,
  story: requiredString.max(10000),
  storyPictures: arrayOfMain,
  storyPlace: requiredString,
  title: requiredString,
  unit: requiredString,
});

interface SubmitStoriesProps {
  categories: ICaptureYourNSMomentsCategoriesProps;
  terms: ICaptureYourNSMomentsTermProps;
}

export default function SubmitStories({
  categories,
  terms,
}: SubmitStoriesProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const google_recaptcha_ns_story = useRef<ReCAPTCHA>(null);

  const [progresspercent, setProgresspercent] = useState(0);
  const [token, setToken] = useState("");
  const [isAgree, setAgree] = useState(false);
  const [properCategories, setProperCategories] =
    useState<{ value: string; label: string }[]>();

  useEffect(() => {
    const temp = [];
    temp.push({
      value: "",
      label: "Select a Category",
    });
    categories.categories.map((item) => {
      temp.push({ value: item.title, label: item.title });
    });
    setProperCategories(temp);
  }, [categories.categories]);

  useEffect(() => {
    window.onSuccessfulReCaptcha = (token) => {
      if (typeof token === "string") {
        setToken(token);
      }
    };

    window.onExpiredReCaptcha = () => {
      setToken("");
    };
  }, []);

  const onSubmit = useCallback(
    async (values, { setSubmitting, resetForm }) => {
      try {
        if (!isAgree) {
          toast({
            title: "Warning",
            description: "You must agree to the Terms & Conditions first",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
          return;
        }

        let files = [];
        files.push({ storyPictures: values.storyPictures });
        files.push({ audio: values.audio });
        files.push({ video: values.video });

        const promises: { [key: string]: UploadTask }[] = [];

        files.map((file) => {
          if (file.video instanceof File) {
            const storageRef = ref(storage, `public/${s.generate()}`);
            promises.push({
              video: uploadBytesResumable(storageRef, file.video),
            });
          }

          if (file.audio instanceof File) {
            const storageRef = ref(storage, `public/${s.generate()}`);
            promises.push({
              audio: uploadBytesResumable(storageRef, file.audio),
            });
          }

          if (Array.isArray(file.storyPictures)) {
            file.storyPictures.map((file2) => {
              if (file2.image instanceof File) {
                const storageRef = ref(storage, `public/${s.generate()}`);
                promises.push({
                  storyPictures: uploadBytesResumable(storageRef, file2.image),
                });
              }
            });
          }
        });

        const tasks = await Promise.all(promises);
        const result: any[] = [];
        for await (let promise of tasks) {
          const key = Object.keys(promise)[0];
          const r = await new Promise((resolve, reject) => {
            promise[key].on("state_changed", {
              next: (snapshot) => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgresspercent(progress);
              },
              error: (error) => {
                reject({ error });
                alert(error);
                setSubmitting(false);
              },
              complete: () => {
                getDownloadURL(promise[key].snapshot.ref).then(
                  (downloadURL) => {
                    resolve(downloadURL);
                  }
                );
              },
            });
          });
          result.push({ [key]: r });
        }

        let storyPictures: any[] = [];
        let audioUrl = "";
        let videoUrl = "";

        result.map((r) => {
          if (Object.keys(r)[0] === "storyPictures") storyPictures.push(r);
          if (Object.keys(r)[0] === "audio") audioUrl = r.audio;
          if (Object.keys(r)[0] === "video") videoUrl = r.video;
        });

        const properValues = {
          storyPictures: storyPictures.map((item) => item.storyPictures),
          audioUrl: audioUrl,
          videoUrl: videoUrl,
          caption: values.caption,
          categoryName: values.categoryName,
          email: values.email,
          isDonate: values.isDonate === "1" ? true : false,
          name: values.name,
          phone: values.phone,
          rank: values.rank,
          story: values.story,
          storyPlace: values.storyPlace,
          title: values.title,
          unit: values.unit,
          recaptcha: token,
        };
        // console.log({ values, properValues });

        const submit = httpsCallable(functions, "submitNsStory");
        await submit(properValues)
          .then((result) => {
            console.log({ result });
            toast({
              title: "Success",
              description: "NS Story Saved",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          })
          .catch((error) => {
            console.log({ error });
            toast({
              title: "Error",
              description: error.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          })
          .finally(() => {
            setSubmitting(false);
            setProgresspercent(0);
            resetForm();
            setToken("");
            setAgree(false);
            google_recaptcha_ns_story.current?.reset();
            document
              .getElementById("capture-ns-story-moment-id")
              ?.scrollIntoView({
                behavior: "smooth",
              });
          });
      } catch (error) {
        console.log({ error });
      }
    },
    [toast, token, isAgree]
  );

  return (
    <Box>
      <Heading textAlign="center" color="brand.green" mb="3rem">
        SHARE YOUR STORIES
      </Heading>
      <Text fontWeight="bold" color="brand.green">
        Over one million National Servicemen have served and contributed to the
        defence and security of Singapore. Are you a Singaporean son wih fond
        memories of your NS days? Or do you have a story to share about someone
        who has gone through NS? Submit your experiences and share these
        treasured NS stories and memories with us.
      </Text>
      <Text fontSize="sm" my="1rem">
        *Denotes required fields
      </Text>

      <Formik
        enableReinitialize
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={onSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form color="brand.green">
            <Flex flexDir={{ base: "column", lg: "row" }} mb="1.5rem">
              <VStack
                w={{ base: "100%", lg: "50%" }}
                mr={{ base: 0, lg: "1rem" }}
              >
                <FormInput
                  id="title"
                  name="title"
                  label="What is the title of your story?*"
                  placeholder="Text input value"
                />
              </VStack>
              <VStack
                w={{ base: "100%", lg: "50%" }}
                mt={{ base: "1.5rem", lg: "0" }}
              >
                <DropDown
                  topMargin="0"
                  id="categoryName"
                  name="categoryName"
                  label="What is your story about? Choose from these five categories.*"
                  data={properCategories && properCategories}
                />
              </VStack>
            </Flex>

            <FormTextArea
              id="story"
              name="story"
              label="Tell us your story. (max 10,000 characters)*"
              placeholder="Text input value"
              mb="1rem"
            />
            <FormTextArea
              id="storyPlace"
              name="storyPlace"
              label="When did your story take place?*"
              placeholder="Text input value"
              mb="1rem"
            />

            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
              gap={6}
            >
              <Box>
                <Box>
                  <ArrayOfImageUpload values={values} />
                </Box>
                <FormTextArea
                  id="caption"
                  name="caption"
                  placeholder="Enter Caption*"
                  mt="1rem"
                  description="Max 1,000 characters"
                />
              </Box>
              <Flex flexDir="column">
                <FormControl>
                  <FormLabel htmlFor="audio">
                    Do you wish to upload an audio file?
                  </FormLabel>
                  <MediaUpload
                    name="audio"
                    type="audio"
                    accept="audio"
                    description="Max 10MB in MP3 format"
                    ratio={20}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="video">
                    Do you wish to upload a video?
                  </FormLabel>
                  <MediaUpload
                    name="video"
                    type="video"
                    accept="video"
                    description="Max 75MB in MP4 format"
                  />
                </FormControl>
              </Flex>
            </Grid>
            <FormRadio
              id="isDonate"
              name="isDonate"
              label="Do you wish to donate an item or photo to the NS-thermed gallery?*"
              mb="1rem"
            />

            <Flex gap="1rem" flexDir={{ base: "column", lg: "row" }}>
              <VStack w={{ base: "100%", lg: "50%" }} alignItems="flex-start">
                <FormInput
                  label="What is your name?*"
                  id="name"
                  name="name"
                  placeholder="Text input value"
                  mb="1rem"
                />
                <FormInput
                  label="What unit were you from?*"
                  id="unit"
                  name="unit"
                  placeholder="Text input value"
                  mb="1rem !important"
                />
                <FormInput
                  label="What is your rank?*"
                  id="rank"
                  name="rank"
                  placeholder="Text input value"
                  mb="1rem"
                />
              </VStack>

              <VStack w={{ base: "100%", lg: "50%" }}>
                <FormInput
                  label="What is your email?*"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Text input value"
                  mb="1rem"
                />
                <FormInput
                  label="What is your mobile number?*"
                  id="phone"
                  name="phone"
                  placeholder="Text input value"
                  mb="1rem"
                />
              </VStack>
            </Flex>
            <Box my="2rem">
              <ReCAPTCHA
                ref={google_recaptcha_ns_story}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                onChange={window.onSuccessfulReCaptcha}
                onExpired={window.onExpiredReCaptcha}
                onErrored={window.onErrorReCaptcha}
              />
            </Box>
            <HStack
              m={{
                base: "1.5rem 0 1rem !important",
              }}
              w="100%"
            >
              <Checkbox
                alignItems="flex-start"
                iconColor="brand.orange"
                size="md"
                sx={{
                  "& .chakra-checkbox__control": {
                    background: "white !important",
                    borderColor: "white !important",
                    borderRadius: "base",
                  },
                }}
                isChecked={isAgree}
                onChange={() => {
                  setAgree(!isAgree);
                }}
              >
                <Flex flexDir={{ base: "column", lg: "row" }}>
                  I have read and agree to the&nbsp;
                  <Text textDecor="underline" onClick={onOpen}>
                    Terms & Conditions*
                  </Text>
                </Flex>
              </Checkbox>
            </HStack>
            <HStack>
              <Button
                bgColor="brand.orange"
                type="submit"
                isLoading={isSubmitting}
              >
                Submit
              </Button>
              {isSubmitting && <Text>Uploading... ({progresspercent}%)</Text>}
            </HStack>
          </Form>
        )}
      </Formik>

      <TermAndConditionsModal terms={terms} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
