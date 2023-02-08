import {
  Flex,
  FormControl,
  FormHelperText,
  Button as ChakraButton,
  FormLabel,
  Grid,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FieldArray } from "formik";
import MediaUpload from "../Atoms/Mediaupload";
import { formValuesType } from "../Organisms/CaptureYourNSMoments/SubmitStories";

interface ArrayOfImageUploadProps {
  values: formValuesType;
}

export default function ArrayOfImageUpload({
  values,
}: ArrayOfImageUploadProps) {
  return (
    <FormControl>
      <FormLabel htmlFor="storyPictures">
        Upload and caption a photo about your story or item.*
      </FormLabel>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          lg: "repeat(2, 1fr)",
        }}
        gap={5}
      >
        <FieldArray name="storyPictures">
          {({ remove, push }) => {
            return (
              <>
                {values.storyPictures.map((list: any, i: number) => {
                  return (
                    <MediaUpload
                      key={i}
                      name={`storyPictures.${i}.image`}
                      type="image"
                      accept="image"
                      ratio={100}
                      onRemove={() => {
                        remove(i);
                      }}
                    />
                  );
                })}
                <ChakraButton
                  border="2px dashed #5C058C"
                  bg="transparent"
                  borderRadius="1rem"
                  w="100%"
                  color="#5C058C"
                  h="100%"
                  p="8%"
                  textAlign="center"
                  justifyContent="center"
                  display="flex"
                  flexDir="column"
                  _focus={{ border: "2px dashed #5C058C" }}
                  onClick={() => {
                    push({});
                  }}
                >
                  <Text>Add</Text>
                </ChakraButton>
              </>
            );
          }}
        </FieldArray>
      </Grid>
      <FormHelperText textAlign="right">
        {`(Max 5MB in JPEG/PNG format)`}
      </FormHelperText>
    </FormControl>
  );
}
