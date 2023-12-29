import { useCallback, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  Alert,
  Button,
  Card,
  Container,
  InputAdornment,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { AccountCircle, Send } from "@mui/icons-material";

import { grey } from "@mui/material/colors";

import Content from "../components/Home/Content";
import AuthenticationModal from "../components/AuthenticationModal";
import ContentSkeleton from "../components/Home/ContentSkeleton";

import { queryClient } from "../App";
import { useAuth } from "../context/AuthContext";
import { editContent, getAllContents } from "../lib/api/contents";
import { postContent } from "../lib/api/contents";
import { deleteContent } from "../lib/api/contents";

const Home = () => {
  const { isAuthenticated } = useAuth();

  const [content, setContent] = useState("");
  const [contentToEdit, setContentToEdit] = useState(null);

  const [isCreateContentLoading, setIsCreateContentLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [severity, setSeverity] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");

  const closeAlert = () => setIsAlertOpen(false);

  const {
    data: contents,
    isFetched,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["contents"],
    queryFn: () => getAllContents(),
    enabled: isAuthenticated,
  });

  const { mutate: onCreateContentMutation } = useMutation({
    mutationFn: (content) => postContent(content),
    onSuccess: () => {
      setContent("");
      setSeverity("success");
      setAlertMsg("Successfully post content!.");
      setIsAlertOpen(true);

      setTimeout(() => {
        setIsCreateContentLoading(false);
      }, 250);
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
  });

  const { mutate: onDeleteContentMutation } = useMutation({
    mutationFn: (id) => deleteContent(id),
    onSuccess: () => {
      setSeverity("success");
      setAlertMsg("Successfully delete content!.");
      setIsAlertOpen(true);
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
    onError: (error) => {
      setSeverity("error");
      setAlertMsg(error);
      setIsAlertOpen(true);
    },
  });

  const { mutate: onEditContentMutation } = useMutation({
    mutationFn: (content) => editContent(content),
    onSuccess: () => {
      setSeverity("success");
      setAlertMsg("Successfully edit content!.");
      setIsAlertOpen(true);
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
    onError: (error) => {
      setSeverity("error");
      setAlertMsg(error);
      setIsAlertOpen(true);
    },
  });

  const onCreateContent = () => {
    setIsCreateContentLoading(true);
    onCreateContentMutation(content);
  };

  const onEditContent = () => {
    onEditContentMutation({ ...contentToEdit, content });
    setEditModeOff();
  };

  const setEditModeOn = useCallback(
    (id) => {
      setIsEditMode(true);

      const _contents = contents.data;
      const content = _contents.find((content) => content.id == id);

      setContentToEdit(content);
      setContent(content.content);
    },
    [contents]
  );

  const setEditModeOff = () => {
    setIsEditMode(false);
    setContentToEdit(null);
    setContent("");
  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: 2,
            my: 2,
          }}
          elevation={4}
        >
          <Stack spacing={2}>
            <Card
              sx={{
                backgroundColor: grey["100"],
              }}
            >
              <TextField
                onChange={(e) => setContent(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": {
                    alignItems: "flex-start",
                    "& .MuiInputAdornment-root": {
                      mt: "0.75rem",
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    background: "transparent",
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                  value: content,
                  multiline: true,
                }}
                placeholder="What's on your mind?"
                fullWidth
              />
            </Card>
            <Button
              variant="contained"
              endIcon={<Send />}
              onClick={isEditMode ? onEditContent : onCreateContent}
              color={isEditMode ? "secondary" : "primary"}
              sx={{
                maxWidth: "fit-content",
                ml: "auto !important",
              }}
            >
              {isEditMode ? "Edit" : "Post"}
            </Button>
            {isEditMode ? (
              <Typography onClick={setEditModeOff}>
                <small>
                  click to close <strong>edit mode.</strong>
                </small>
              </Typography>
            ) : null}
          </Stack>
        </Paper>

        {isCreateContentLoading ? <ContentSkeleton /> : null}

        {isFetched && contents.data?.length > 0
          ? contents.data.map((_content) => (
              <Content
                key={_content.id}
                {..._content}
                handleDeleteContent={onDeleteContentMutation}
                handleEditContent={setEditModeOn}
              />
            ))
          : null}

        {isLoading || isPending
          ? [...Array(5)].map((_, i) => <ContentSkeleton key={i} />)
          : null}
      </Container>

      <Snackbar
        open={isAlertOpen}
        onClose={closeAlert}
        autoHideDuration={2000}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert severity={severity}>{alertMsg || "Unknown Error"}</Alert>
      </Snackbar>

      <AuthenticationModal />
    </>
  );
};

export default Home;
