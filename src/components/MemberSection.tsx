import type { Dispatch, SetStateAction } from "react";

import { Flex, TextField, Text, Button, Section, Box, Heading, Card } from "@radix-ui/themes";
import { pipe } from "effect";
import { appendAll, map, dedupe, dropWhile } from "effect/Array";
import { equals } from "effect/Equal";
import { split, trim } from "effect/String";
import { useState } from "react";

interface MembersSectionProps {
    members: string[];
    onChangeMembers: Dispatch<SetStateAction<string[]>>;
}

const MembersSection = (props: MembersSectionProps) => {
    const { members, onChangeMembers } = props;

    const [value, setValue] = useState("");

    const handleUpdateMembers = () => {
        onChangeMembers((prev) => pipe(value, split(/,|;/), map(trim), appendAll(prev), dedupe));
        setValue("");
    };

    const handleDeleteMember = (name: string) => {
        onChangeMembers((prev) => dropWhile(prev, equals(name)));
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
                    {members.map((member, idx) => (
                        <Flex key={member}>
                            <Flex flexGrow="1" gap="8px">
                                <Text size="5">{idx + 1}.</Text>
                                <Text size="5">{member}</Text>
                            </Flex>
                            <Button size="3" color="red" onClick={() => handleDeleteMember(member)}>
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
