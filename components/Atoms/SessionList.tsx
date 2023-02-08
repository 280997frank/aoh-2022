import {
  Table,
  Thead,
  Tbody,
  Heading,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import type { FC } from "react";
import type { TableColumnHeaderProps } from "@chakra-ui/react";
import type { Session } from "@/interfaces/sessions";

interface SessionListProps {
  caption: string;
  data: Session["timeSlots"];
}

const thStyles: TableColumnHeaderProps = {
  fontSize: { base: "0.75rem", lg: "0.9375rem" },
  color: "brand.green",
  textTransform: "none",
};

const tdStyles = {
  fontSize: { base: "0.75rem", lg: "lg" },
  color: "brand.green",
};

const SessionList: FC<SessionListProps> = ({ caption, data }) => {
  return (
    <TableContainer
      borderRadius={{ base: "0.5rem", lg: "1.3125rem" }}
      border="1px solid #C0BE9A"
      bgColor="rgba(251, 250, 229, 0.3)"
      px={{ base: 0, lg: 8 }}
      py={{ base: 0, lg: 5 }}
      // filter="drop-shadow(1px 3px 7px rgba(0, 0, 0, 0.25))"
      w="full"
      m="0 auto"
    >
      <Table variant="unstyled">
        <TableCaption placement="top">
          <Heading
            fontSize={{ base: "md", lg: "1.6875rem" }}
            color="brand.orange"
            textAlign="left"
            textTransform="uppercase"
          >
            {caption}
          </Heading>
        </TableCaption>
        <Thead>
          <Tr>
            <Th {...thStyles}>Activity</Th>
            <Th {...thStyles}>Time</Th>
            <Th {...thStyles}>Location</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(({ title, startTime, endTime, location }) => (
            <Tr
              key={title}
              borderBottom="1px solid #C0BE9A"
              sx={{
                "&:last-child": {
                  borderBottom: "none",
                },
              }}
            >
              <Td {...tdStyles}>{title}</Td>
              <Td {...tdStyles}>{`${startTime.replace(
                ":",
                ""
              )}hrs - ${endTime.replace(":", "")}hrs`}</Td>
              <Td {...tdStyles}>{location}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default SessionList;
