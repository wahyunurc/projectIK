import { useRef, useState, memo } from "react";
import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  AccountCircle,
  AccountCircleOutlined,
  BookmarkBorderOutlined,
  ChatBubbleOutline,
  Delete,
  Edit,
  Favorite,
  MoreHoriz,
  FavoriteBorder,
  Send,
  ShareOutlined,
} from "@mui/icons-material";

// import NestedComments from "./Comment";
import { grey } from "@mui/material/colors";

import { dayjs } from "../../lib/dayjs";
import { formatNumber } from "../../lib/fn";

// const comments = [
//   {
//     id: 1,
//     author: "User 1",
//     avatar: "url_to_avatar",
//     text: "Comment 1",
//     replies: [
//       {
//         id: 2,
//         author: "User 2",
//         avatar: "url_to_avatar",
//         text: "Reply to Comment 1",
//       },
//       {
//         id: 4,
//         author: "User 2",
//         avatar: "url_to_avatar",
//         text: "Reply to Comment 1",
//         replies: [
//           {
//             id: 5,
//             author: "User 1",
//             avatar: "url_to_avatar",
//             text: "Reply to Comment 2",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 3,
//     author: "User 3",
//     avatar: "url_to_avatar",
//     text: "Comment 2",
//   },
// ];

/** @type {import("react").FC<import("../../lib/api/contents").Content & { handleDeleteContent: (id: string) => void, handleEditContent: (id: string) => void }>} */
const Component = ({
  id,
  User,
  content,
  _count,
  likedByMe,
  createdAt,
  handleDeleteContent,
  handleEditContent,
}) => {
  const contentTools = useRef();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const openPopover = () => setIsPopoverOpen(true);
  const closePopover = () => setIsPopoverOpen(false);

  const onDeleteContent = () => {
    closePopover();
    handleDeleteContent(id);
  };

  const setToEditMode = () => {
    closePopover();
    handleEditContent(id);
  };

  return (
    <>
      <Paper
        sx={{
          p: 2,
          mb: 10,
        }}
        elevation={4}
      >
        <Stack spacing={1} direction="row">
          <AccountCircleOutlined fontSize="large" />
          <Stack spacing={2} width="100%">
            <Stack direction="row" justifyContent="space-between">
              <Stack>
                <Typography
                  fontWeight="bold"
                  variant="subtitle1"
                  sx={{
                    width: {
                      xs: "150px",
                      md: "100%",
                    },
                    textOverflow: {
                      xs: "ellipsis",
                      md: "unset",
                    },
                    overflowX: {
                      xs: "hidden",
                      md: "auto",
                    },
                    whiteSpace: {
                      xs: "nowrap",
                      md: "inherit",
                    },
                  }}
                >
                  {User.username}
                </Typography>
                <Typography variant="caption" sx={{ color: grey["600"] }}>
                  {dayjs(createdAt).fromNow()}
                </Typography>
              </Stack>
              <IconButton ref={contentTools} onClick={openPopover}>
                <MoreHoriz />
              </IconButton>
              <Popover
                open={isPopoverOpen}
                onClose={closePopover}
                anchorEl={contentTools.current}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <List>
                  <ListItem>
                    <ListItemButton onClick={setToEditMode}>
                      <ListItemIcon>
                        <Edit />
                      </ListItemIcon>
                      <ListItemText primary="Edit" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton onClick={onDeleteContent}>
                      <ListItemIcon>
                        <Delete />
                      </ListItemIcon>
                      <ListItemText primary="Delete" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Popover>
            </Stack>

            <Typography>{content}</Typography>

            <Stack spacing={3} direction="row">
              <Stack direction="row" alignItems="center">
                <Tooltip title="Like" arrow>
                  <IconButton>
                    {likedByMe ? (
                      <Favorite color="error" />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                </Tooltip>
                <Typography variant="subtitle2" sx={{ color: grey["600"] }}>
                  {formatNumber(_count.Likes)}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Tooltip title="Comment" arrow>
                  <IconButton>
                    <ChatBubbleOutline />
                  </IconButton>
                </Tooltip>
                <Typography variant="subtitle2" sx={{ color: grey["600"] }}>
                  {formatNumber(_count.Comments)}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Tooltip title="Save" arrow>
                  <IconButton>
                    <BookmarkBorderOutlined />
                  </IconButton>
                </Tooltip>
                <Typography variant="subtitle2" sx={{ color: grey["600"] }}>
                  1m
                </Typography>
              </Stack>
              <Tooltip title="Share" arrow>
                <IconButton
                  sx={{
                    ml: "auto !important",
                    mr: "1rem !important",
                  }}
                >
                  <ShareOutlined />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>

        <TextField
          sx={{
            mt: 3,
          }}
          InputProps={{
            sx: {
              background: grey["100"],
              borderRadius: 999,
            },
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton color="primary">
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
            multiline: true,
          }}
          placeholder="Write a comment"
          fullWidth
        />

        {/* <NestedComments comments={comments} /> */}
      </Paper>
    </>
  );
};

const Content = memo(Component);

export default Content;
