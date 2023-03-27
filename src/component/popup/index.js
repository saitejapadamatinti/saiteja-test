import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";

const UpdatePopup = (props) => {
    const {closePopup, rowDetails,onUpdateFunction} = props
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateUrl, setUpdateUrl] = useState("");

  useEffect(() => {
    setUpdateTitle(rowDetails.title);
    setUpdateUrl(rowDetails.videoUrl)
  }, [rowDetails]);

  const onClickUpdate = () => {
    onUpdateFunction(rowDetails.id, updateTitle, updateUrl, rowDetails.category)
  }

  console.log(props);
  return (
    <>
      <Popup modal defaultOpen={true}>
        {(close) => (
          <>
            <div className="poput-main-div ">
              <div>
                <div className="popup-edit-div">
                  <label>Title</label>
                  <input
                    className="caterogy-name-input popup-input-title"
                    value={updateTitle}
                    type="text"
                    onChange={(e) => setUpdateTitle(e.target.value)}
                  />
                  <label>Video Link</label>
                  <input
                    className="caterogy-name-input popup-input-title"
                    value={updateUrl}
                    type="text"
                    onChange={(e) => setUpdateUrl(e.target.value)}
                  />
                  <div>
                    <button
                      type="button"
                      className="trigger-button add-category-add-button"
                      onClick={() => onClickUpdate()}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="trigger-button add-category-add-button"
                      onClick={() => closePopup()}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Popup>
    </>
  );
};

export default UpdatePopup;
