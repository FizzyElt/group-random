import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

import { pipe } from "effect";

import { appendAll, map, dropWhile, dedupe } from "effect/Array";
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

interface GroupsSectionProps {
  groups: string[];
  onChangeGroups: Dispatch<SetStateAction<string[]>>;
}

const GroupsSection = (props: GroupsSectionProps) => {
  const { groups, onChangeGroups } = props;

  const [value, setValue] = useState("");

  const handleUpdateGroups = () => {
    onChangeGroups((prev) =>
      pipe(value, split(/,|;/), map(trim), appendAll(prev), dedupe),
    );
    setValue("");
  };

  const handleDeleteGroup = (name: string) => {
    onChangeGroups((prev) => pipe(prev, dropWhile(equals(name))));
  };

  return (
    <Section className="border">
      <Card>
        <Heading mb="4">群組</Heading>
        <Flex direction="column" gap="4" align="stretch">
          <Flex gap="2">
            <TextField.Root
              size="3"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button size="3" onClick={handleUpdateGroups}>
              Add
            </Button>
          </Flex>
          {groups.map((group) => (
            <Flex key={group}>
              <Box flexGrow="1">
                <Text size="5">{group}</Text>
              </Box>
              <Button
                size="3"
                color="red"
                onClick={() => handleDeleteGroup(group)}
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

export default GroupsSection;
