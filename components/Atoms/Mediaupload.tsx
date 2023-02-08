import {
  FC,
  MouseEventHandler,
  ChangeEventHandler,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  VisuallyHidden,
  IconButton,
  Image,
  Box,
  Icon,
  Text,
  Center,
  FormHelperText,
} from "@chakra-ui/react";
import { MdFileUpload } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { useField } from "formik";

interface MediaUploadProps {
  name: string;
  type: "video" | "image" | "audio" | "all" | "application/pdf";
  accept?: "video" | "image" | "audio" | "all" | "application/pdf";
  mimeType?: string;
  label?: string;
  description?: string;
  ratio?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onRemove?: MouseEventHandler<HTMLButtonElement>;
  aspectRatio?: string;
}

const MediaUpload: FC<MediaUploadProps> = ({
  name,
  type,
  label = "",
  description,
  ratio = 56.25,
  mimeType = "",
  accept = "all",
  onChange = () => {},
  onRemove,
  aspectRatio = "16:9",
}) => {
  const [{ value }, meta, { setValue, setTouched }] = useField<string | File>(
    name
  );
  const [fileUrl, setFileUrl] = useState("");
  const [showImagePreview, setImagePreviewVisible] = useState(
    type === "image" || type === "all"
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const removeItem = useCallback(() => {
    URL.revokeObjectURL(fileUrl);
    setFileUrl("");
    setValue("");
  }, [fileUrl, setValue]);

  useEffect(() => {
    if (fileUrl) {
      return () => {
        URL.revokeObjectURL(fileUrl);
      };
    }
  }, [fileUrl]);

  useEffect(() => {
    if (value instanceof File) {
      setFileUrl(URL.createObjectURL(value));
    }
  }, [value]);

  return (
    <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
      {label && (
        <FormLabel fontWeight="bold" textTransform="uppercase">
          {label}
        </FormLabel>
      )}
      <Box
        paddingTop={`${ratio}%`}
        borderRadius="1rem"
        position="relative"
        background="brand.orange"
        color="white"
      >
        <Box
          as="label"
          height="100%"
          w="100%"
          position="absolute"
          display="block"
          cursor="pointer"
          top="0"
        >
          <Center h="100%" flexDir="column">
            <Icon as={MdFileUpload} color="white" fontSize="2.5rem" />
            <Text color="white" fontWeight="bold">
              Upload {accept === "image" ? "Thumbnail" : ""}
              {accept === "all" ? "Image/Video" : ""}
              {accept === "video" ? "Video" : ""}
              {accept === "audio" ? "Audio" : ""}
            </Text>
          </Center>
          {showImagePreview && (value instanceof File ? fileUrl : value) && (
            <Image
              src={value instanceof File ? fileUrl : value}
              alt={value instanceof File ? value.name : ""}
              position="absolute"
              bgColor="white"
              top="0"
              width="100%"
              height="100%"
              fit="cover"
              align="top"
              onError={() => {
                setImagePreviewVisible(false);
              }}
              draggable={false}
            />
          )}
          {type === "video" && (value instanceof File ? fileUrl : value) && (
            <video
              ref={videoRef}
              preload="metadata"
              width="960"
              height="540"
              controls
              controlsList="nodownload"
              muted
              autoPlay
              loop
              style={{
                position: "absolute",
                top: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "white",
              }}
              /* onError={() => {
                if (videoRef.current) {
                  videoRef.current.style.display = "none";
                }
              }} */
            >
              <source
                src={value instanceof File ? fileUrl : value}
                type={value instanceof File ? value.type : mimeType}
              />
            </video>
          )}
          {type === "audio" && (value instanceof File ? fileUrl : value) && (
            <audio
              controls
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                backgroundColor: "#F65438",
                borderRadius: "1rem",
              }}
              ref={audioRef}
              preload="metadata"
            >
              <source
                src={value instanceof File ? fileUrl : value}
                type={value instanceof File ? value.type : mimeType}
              />
              {"Your browser does not support the audio element."}
            </audio>
          )}
          <VisuallyHidden>
            <input
              type="file"
              value=""
              accept={
                accept === "all" ? "image/*,video/*,audio/*" : `${accept}/*`
              }
              onChange={(e) => {
                if (
                  e.currentTarget.files instanceof window.FileList &&
                  e.currentTarget.files.length > 0
                ) {
                  URL.revokeObjectURL(fileUrl);
                  setValue(e.currentTarget.files[0]);
                  const objectUrl = URL.createObjectURL(
                    e.currentTarget.files[0]
                  );
                  setFileUrl(objectUrl);
                  setTouched(true);
                }

                onChange(e);
              }}
            />
          </VisuallyHidden>
        </Box>
        <IconButton
          color="black"
          aria-label="Remove image"
          icon={<IoMdTrash />}
          variant="ghost"
          bgColor="white"
          borderRadius="50%"
          position="absolute"
          top="4%"
          right="2.5%"
          size="sm"
          type="button"
          fontSize="1.4rem"
          onClick={onRemove || removeItem}
        />
      </Box>
      {description && (
        <FormHelperText textAlign="right">{description}</FormHelperText>
      )}
      <FormErrorMessage
        justifyContent="flex-end"
        color="brand.orange"
        fontSize={{
          base: "xs",
          md: "md",
        }}
      >
        {meta.error}
      </FormErrorMessage>
    </FormControl>
  );
};

export default MediaUpload;
