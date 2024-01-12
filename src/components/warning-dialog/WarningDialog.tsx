import React from "react";
import "./WarningDialog.scss";

const WarningDialog = ({
  dialogVisibility,
  setDialogVisibility,
  onFinalizeTodo,
}) => {
  return (
    <>
      {dialogVisibility && (
        <div className="wrapper">
          <div className="modal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title"></h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setDialogVisibility(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure is it fully done?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn"
                    data-bs-dismiss="modal"
                    onClick={() => setDialogVisibility(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => onFinalizeTodo()}
                  >
                    Sure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WarningDialog;
