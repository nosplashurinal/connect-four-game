import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import { DialogTitle } from "./DialogTitle";
import { DialogContent } from "./DialogContent";
import { DialogActions } from "./DialogActions";

const useStyles = makeStyles((theme) => ({
  paperRoot: ({ disablePadding }) => ({
    padding: disablePadding ? 0 : "24px",
    backgroundColor: theme.palette.common.white,
    overflow: "visible",
  }),
  dialogPadding: {
    padding: theme.spacing(4),
  },
}));

const _defaultModalActions = {
  successAction: null,
  cancelAction: null,
  closeAction: null,
};

const ESCAPE_KEY_DOWN = "escapeKeyDown";
const BACKDROP_CLICK = "backdropClick";
const reasonForDialogClose = { ESCAPE_KEY_DOWN, BACKDROP_CLICK };

export const BaseModal = function ({
  // Base properties
  isModalOpen,
  title = null,
  disablePadding = false,
  showTitle = true,
  message = null,
  modalActions = _defaultModalActions,
  showActions = true,
  forceMode = true, // Please specify the reason and override the event in case of force mode

  // Default Buttons Text
  cancelText = "Cancel",
  successText = "Done",

  // Render Props
  renderTitle = null,
  renderBody = null,
  renderFooter = null,

  // Optional Params
  onEscapePressed,
  onBackdropClick,
  isSending = false,
  successActionDisabled = false,
  maxWidth = "sm",
  fullWidth = true,
  alignment,
  dialogType,
  hideCancelButton = false,
}) {
  const classes = useStyles({ disablePadding });
  // Init Component
  const [_isModalOpen, setModalOpen] = useState(isModalOpen);

  //   const rootClasses = useStyles();
  // Clean up useEffect
  useEffect(() => {
    setModalOpen(isModalOpen);
    return () => {};
  }, [isModalOpen]);

  const closeAction = (e) => {
    if (modalActions.closeAction) {
      return modalActions.closeAction(e);
    }
    return _toggleModal(e, false);
  };

  const onSuccessAction = (e) => {
    if (modalActions.onSuccessAction) {
      return modalActions.onSuccessAction(e);
    }
  };

  const onCancelAction = (e) => {
    if (modalActions.onCancelAction) {
      return modalActions.onCancelAction(e);
    }
    return closeAction(e);
  };

  const _onClose = (e, reason) => {
    switch (reason) {
      case reasonForDialogClose.ESCAPE_KEY_DOWN:
        onEscapePressed && onEscapePressed(e);
        break;
      case reasonForDialogClose.BACKDROP_CLICK:
        onBackdropClick && onBackdropClick(e);
        break;
      default:
        // Close the modal only if force mode is false
        // allow the parent component to override the reason here
        // in case of the force mode
        if (!forceMode) {
          closeAction(e);
        }
    }
  };

  const _toggleModal = (e, flag) => {
    if (flag) {
      setModalOpen(flag);
    } else {
      setModalOpen(!_isModalOpen);
    }
    return _isModalOpen;
  };

  // Render Title
  const _renderTitle = () => {
    if (renderTitle) {
      return renderTitle();
    }
    return title ? (
      <DialogTitle onClose={closeAction}>{title}</DialogTitle>
    ) : null;
  };

  // Render Body
  const _renderBody = () => {
    if (renderBody) {
      return renderBody();
    }
    return <DialogContent message={message} />;
  };

  // Render Footer
  const _renderFooter = () => {
    if (renderFooter) {
      return renderFooter();
    }
    return (
      <DialogActions
        classes={{ root: classes.dialogActions }}
        successText={successText}
        cancelText={cancelText}
        onSuccessAction={onSuccessAction}
        onCancelAction={onCancelAction}
        isSending={isSending}
        isDisabled={successActionDisabled}
        dialogType={dialogType}
        alignment={alignment}
        hideCancelButton={hideCancelButton}
      />
    );
  };

  return (
    <Dialog
      onClose={_onClose}
      aria-labelledby={title}
      open={_isModalOpen}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      classes={{ paper: classes.paperRoot }}
    >
      {showTitle && _renderTitle()}
      {_renderBody()}
      {showActions && _renderFooter()}
    </Dialog>
  );
};
