import { ContentCopyOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useAuth } from "../context/AuthContext";
import { verifyApiToken, createUser } from "../lib/api/users";

const AuthenticationModal = () => {
  const { isAuthenticated, storeApiKeyToLS, getApiKey } = useAuth();

  const [anchor, setAnchor] = useState(null);
  const [state, setState] = useState("initial");
  const [apiKey, setApiKey] = useState("");

  const [isCopied, setIsCopied] = useState(false);
  const [open, setIsOpen] = useState(false);

  const { mutate: handleOnCreateUser, isSuccess: isCreateUserSuccess } =
    useMutation({
      mutationFn: createUser,
      onSuccess: (data) => {
        const apiKey = data.data.api_key;

        setApiKey(apiKey);
        storeApiKeyToLS(apiKey);
      },
    });

  const {
    mutate: onVerifyApiToken,
    isSuccess: isVerifyTokenSuccess,
    isError: isVerifyTokenError,
    error: verifyApiTokenError,
  } = useMutation({
    mutationFn: (apiKey) => verifyApiToken(apiKey),
    onSuccess: (data) => {
      const apiKey = data.data.user.api_key;
      storeApiKeyToLS(apiKey);

      setTimeout(() => {
        onClose();
      }, 1000);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    setIsOpen(!isAuthenticated);
  }, [isAuthenticated]);

  const onClose = () => {
    getApiKey();

    if (isAuthenticated) {
      setIsOpen(false);
    }
  };

  const onCreateUser = () => {
    setState("create");

    handleOnCreateUser();
  };

  /**
   * @param {Parameters<JSX.IntrinsicElements["button"]["onClick"]>[0]} e
   * @param {string} value
   */
  const onCopyClipboard = async (e, value) => {
    setAnchor(e.currentTarget);

    storeApiKeyToLS(value);

    return window.navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    });
  };

  const onCheckApiToken = () => {
    onVerifyApiToken(apiKey);
  };

  if (state == "initial")
    return (
      <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
        <DialogTitle id="alert-dialog-title">
          We detect you don&apos;t store API key.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can create a new user and get new API key, or you can use your
            old one if you have
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCreateUser}>Create New Key</Button>
          <Button variant="contained" onClick={() => setState("upload")}>
            Use Old Key
          </Button>
        </DialogActions>
      </Dialog>
    );

  if (state == "create")
    return (
      <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
        <DialogTitle id="alert-dialog-title">
          This is your API Key, please keep it somewhere safe.
        </DialogTitle>
        <DialogContent>
          <TextField
            InputProps={{
              disabled: !isCreateUserSuccess,
              readOnly: true,
              value: apiKey,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-describedby="clipboard"
                    onClick={(e) => onCopyClipboard(e, apiKey)}
                  >
                    <ContentCopyOutlined />
                  </IconButton>
                  <Popover
                    sx={{
                      "*": {
                        overflow: "visible !important",
                      },
                    }}
                    anchorEl={anchor}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    open={isCopied}
                    id="clipboard"
                  >
                    <Typography variant="caption" color="green" sx={{ p: 2 }}>
                      Copied!
                    </Typography>
                  </Popover>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );

  if (state == "upload")
    return (
      <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
        <DialogTitle id="alert-dialog-title">
          Input your API key here.
        </DialogTitle>
        <DialogContent>
          <TextField
            placeholder="z982i.xxxx.xxxx"
            InputProps={{
              value: apiKey,
              onChange: (e) => {
                setApiKey(e.target.value);
              },
            }}
            fullWidth
          />
          <Typography
            sx={(theme) => ({
              mt: 1,
              color: isVerifyTokenSuccess
                ? theme.palette.success.main
                : isVerifyTokenError
                ? theme.palette.error.main
                : undefined,
            })}
          >
            {isVerifyTokenSuccess
              ? "Success"
              : isVerifyTokenError
              ? verifyApiTokenError
              : null}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setState("initial")}>Back</Button>
          <Button onClick={onCheckApiToken} variant="contained">
            Check
          </Button>
        </DialogActions>
      </Dialog>
    );
};

export default AuthenticationModal;
