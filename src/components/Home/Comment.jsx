import { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";

import {
  Reply,
  ThumbUp,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";

const MAX_DEPTH = 5; // Set your maximum depth

const Comment = ({ comment, depth = 0 }) => {
  const [showReplies, setShowReplies] = useState(true);

  if (depth > MAX_DEPTH) {
    return null; // Prevent infinite recursion
  }

  return (
    <Card variant="outlined" style={{ margin: "8px", marginLeft: depth * 16 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar alt={comment.author} src={comment.avatar} />
          <Typography
            variant="body2"
            color={depth === 0 ? "initial" : "text.secondary"}
          >
            {comment.author}
          </Typography>
        </Stack>
        <Typography
          variant="body1"
          style={{
            marginTop: "8px",
            color: depth === 0 ? "initial" : "text.secondary",
          }}
        >
          {comment.text}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: "8px" }}
        >
          <IconButton aria-label="Like" size="small">
            <ThumbUp />
          </IconButton>
          <IconButton aria-label="Reply" size="small">
            <Reply />
          </IconButton>
          {comment.replies && comment.replies.length > 0 && (
            <IconButton
              aria-label={showReplies ? "Hide Replies" : "Show Replies"}
              size="small"
              onClick={() => {
                setShowReplies(!showReplies);
              }}
            >
              {showReplies ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          )}
        </Stack>
      </CardContent>
      {showReplies && comment.replies && comment.replies.length > 0 && (
        <div style={{ paddingLeft: "16px" }}>
          <Divider />
          <Stack spacing={2} style={{ marginTop: "8px" }}>
            {comment.replies.map((reply) => (
              <Comment key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </Stack>
        </div>
      )}
    </Card>
  );
};

const NestedComments = ({ comments }) => {
  const [showReplies, setShowReplies] = useState(true);

  return (
    <div>
      {showReplies ? (
        <Stack spacing={2}>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onToggleReplies={() => setShowReplies(!showReplies)}
            />
          ))}
        </Stack>
      ) : null}
    </div>
  );
};

export default NestedComments;
