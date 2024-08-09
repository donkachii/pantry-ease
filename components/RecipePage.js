"use client";
import { useState, useEffect } from "react";
import { useChat } from "ai/react";
import OpenAI from "openai";
import { Typography, Stack, Button, TextField } from "@mui/material";
import PageContainer from "./PageContainer";
import SendIcon from "@mui/icons-material/Send";

import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch, useAppStore } from "../libs/hooks";
import Loading from "../app/dashboard/loading";
import { readStreamableValue } from "ai/rsc";
import { generate } from "../app/action";

const RecipePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [generation, setGeneration] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSend = async () => {
    // const completion = await openai.chat.completions.create({
    //   model: "meta-llama/llama-3.1-8b-instruct:free",
    //   messages: [{ role: "user", content: searchTerm }],
    //   top_p: 1,
    //   temperature: 1,
    //   repetition_penalty: 1,
    // });

    // console.log(completion.choices[0].message);
    setSearchTerm("");
    setGeneration("");

    const { output } = await generate(searchTerm);

    for await (const delta of readStreamableValue(output)) {
      setGeneration((currentGeneration) => `${currentGeneration}${delta}`);
    }
  };

  console.log(generation);

  return (
    <PageContainer title="Recipe" description="this is List Items">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Recipes</Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Generate a Recipe..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          disabled={isLoading}
          fullWidth
        />
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleSend}>
          Send
        </Button>
      </Stack>

      {isLoading && (
        <>
          <p>Loading....</p>
          <Loading />
        </>
      )}

      {generation && <div>{generation}</div>}
    </PageContainer>
  );
};

export default RecipePage;
