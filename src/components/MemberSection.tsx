import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

import { pipe } from "effect";

import { appendAll, map, dedupe, dropWhile } from "effect/Array";
import { split, trim } from "effect/String";
import { equals } from "effect/Equal";

import {
  Flex,
  TextField,
  Text,
  Button,
  Section,
  Box,
  Heading,
  Card,
} from "@radix-ui/themes";

interface MembersSectionProps {
  members: string[];
  onChangeMembers: Dispatch<SetStateAction<string[]>>;
}

const MembersSection = (props: MembersSectionProps) => {
  const { members, onChangeMembers } = props;

  const [value, setValue] = useState("");

  const handleUpdateMembers = () => {
    onChangeMembers((prev) =>
      pipe(value, split(/,|;/), map(trim), appendAll(prev), dedupe),
    );
    setValue("");
  };

  const handleDeleteMember = (name: string) => {
    onChangeMembers((prev) => pipe(prev, dropWhile(equals(name))));
  };

  return (
    <Section>
      <Card>
        <Heading mb="4">成員</Heading>
        <Flex direction="column" gap="4" align="stretch">
          <Flex gap="2">
            <TextField.Root
              size="3"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button size="3" onClick={handleUpdateMembers}>
              Add
            </Button>
          </Flex>
          {members.map((member) => (
            <Flex key={member}>
              <Box flexGrow="1">
                <Text size="5">{member}</Text>
              </Box>
              <Button
                size="3"
                color="red"
                onClick={() => handleDeleteMember(member)}
              >
                Delete
              </Button>
            </Flex>
          ))}
        </Flex>
      </Card>
    </Section>
  );
};

export default MembersSection;
