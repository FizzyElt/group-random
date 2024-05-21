import { useState } from "react";
import {
  Container,
  Flex,
  Box,
  Button,
  Grid,
  Heading,
  Text,
  Card,
} from "@radix-ui/themes";
import { map, join } from "effect/Array";
import { pipe } from "effect";

import MembersSection from "./components/MemberSection";
import GroupsSection from "./components/GroupsSection";

import { shuffle, assignMemberToGroup } from "./core";

function App() {
  const [groupList, setGroupList] = useState<
    Array<{ name: string; members: string[] }>
  >([]);

  const [members, setMembers] = useState<string[]>([]);
  const [groups, setGroups] = useState<string[]>([]);

  const handleAssign = () => {
    setGroupList(assignMemberToGroup(shuffle(members), groups));
  };

  const handleClear = () => {
    setGroupList([]);
  };

  const handleCopy = () => {
    const copyString = pipe(
      groupList,
      map(
        ({ name, members }) =>
          `${name}:\n${pipe(
            members,
            map((member) => `  - ${member}`),
            join("\n"),
          )}`,
      ),
      join("\n"),
    );

    navigator.clipboard.writeText(copyString);
  };

  const handleJson = () => {
    const content = JSON.stringify(groupList, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <Container>
      <Flex align="stretch" gap="4">
        <Box flexGrow="1">
          <MembersSection members={members} onChangeMembers={setMembers} />
        </Box>
        <Box flexGrow="1">
          <GroupsSection groups={groups} onChangeGroups={setGroups} />
        </Box>
      </Flex>
      <Flex justify="end" gap="2" mb="5">
        <Button size="3" color="red" onClick={handleClear}>
          清除
        </Button>
        <Button size="3" onClick={handleAssign}>
          分配
        </Button>
      </Flex>

      {groupList.length > 0 && (
        <Card>
          <Flex justify="end" mb="3" gap="1">
            <Button onClick={handleCopy}>Copy</Button>
            <Button onClick={handleJson}>Json</Button>
          </Flex>
          <Grid gap="3" columns={{ initial: "1", md: "3" }} width="auto">
            {map(groupList, ({ name, members }) => (
              <Card key={name}>
                <Flex gap="3" direction="column">
                  <Heading size="7">{name}</Heading>
                  <Flex gap="2" direction="column">
                    {map(members, (member) => (
                      <Text size="5" key={member}>
                        {member}
                      </Text>
                    ))}
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Card>
      )}
    </Container>
  );
}

export default App;
