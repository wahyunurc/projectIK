import { IconButton, Paper, Skeleton, Stack, Tooltip } from "@mui/material";

import {
  AccountCircleOutlined,
  BookmarkBorderOutlined,
  ChatBubbleOutline,
  FavoriteBorder,
  MoreHoriz,
  ShareOutlined,
} from "@mui/icons-material";

const ContentSkeleton = () => {
  return (
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
              <Skeleton width={150} />
              <Skeleton width={50} />
            </Stack>
            <IconButton>
              <MoreHoriz />
            </IconButton>
          </Stack>

          <Skeleton variant="rounded" height={80} />

          <Stack spacing={3} direction="row">
            <Stack direction="row" alignItems="center">
              <Tooltip title="Like" arrow>
                <IconButton>
                  <FavoriteBorder />
                </IconButton>
              </Tooltip>
              <Skeleton width={20}/>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Tooltip title="Comment" arrow>
                <IconButton>
                  <ChatBubbleOutline />
                </IconButton>
              </Tooltip>
              <Skeleton width={20}/>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Tooltip title="Save" arrow>
                <IconButton>
                  <BookmarkBorderOutlined />
                </IconButton>
              </Tooltip>
              <Skeleton width={20}/>
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
    </Paper>
  );
};

export default ContentSkeleton;
