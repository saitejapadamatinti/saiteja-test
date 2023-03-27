import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./index.css";
import { AiFillPlayCircle, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import Popup from "reactjs-popup";
import ReactPlayer from "react-player";
import uuid from "react-uuid";
import UpdatePopup from "../popup";

const categoryArray = [
  {
    category: "Educational",
  },
  {
    category: "Entertainment",
  },
  {
    category: "Business",
  },
];

const urlData = window.location.origin + "/server/db.json";

const HomePage = () => {
  const [categoryName, SetCategoryName] = useState("");
  const [title, SetTitle] = useState("");

  const [url, SetUrl] = useState("");
  const [category, SetCategory] = useState("Educational");

  const [addedCategoryArray, setAddedCategoryArray] = useState(categoryArray);
  const [fetchedData, setFetchedData] = useState([]);
  console.log(fetchedData);

  // histoy Data
  const [historyArray, setHistoryArray] = useState([]);

  const [isEdited, setIsedited] = useState({
    status: false,
    rowDetails: {},
  });

  //   adding category this method
  const onCategoryAddButton = () => {
    const newArray = { category: categoryName };
    const updatedArrayCategory = [...addedCategoryArray, newArray];
    categoryName === ""
      ? alert("Please Add Valid Category")
      : setAddedCategoryArray(updatedArrayCategory);
    SetCategoryName("");
  };

  //   sending new video item to data
  const addVideoButtonSend = async () => {
    const newVideoData = {
      id: uuid(),
      categoryName: category,
      title: title,
      video_url: url,
    };
    const newVideoItem = [...fetchedData, newVideoData];
    (title || url) === ""
      ? alert("Please Add Valid Video Details")
      : setFetchedData(newVideoItem);
    // setFetchedData(newVideoItem);
    SetUrl("");
    SetTitle("");
  };

  // fetching url data
  const getDataFromApi = async () => {
    const data = await Axios(urlData);
    setFetchedData(data.data.data);
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  // on play button click History
  const onPlayButtonClick = (id) => {
    const playedVideoData = fetchedData.filter((each) => {
      return each.id === id;
    });
    setHistoryArray([...historyArray, ...playedVideoData]);
  };

  // editing the title and url
  const onClickEditBtn = (id) => {
    console.log(id);
  };

  // update button fuction
  const onUpdateFunction = (id, title, videoUrl, category) => {
    console.log(id, title, videoUrl, category);
    const singleObject = fetchedData.find((eachObject) => eachObject.id === id);
    singleObject.title = title;
    singleObject.video_url = videoUrl;
    const oldVideoData = fetchedData.filter((eachVideo) => eachVideo.id !== id);
    setFetchedData([...oldVideoData, singleObject]);
    closePopup();
  };

  // onClick remove history
  const onClickRemoveHistory = () => {
    setHistoryArray([]);
  };

  // on Delete Functionality
  const onClickDeletBtn = (id) => {
    const filterdDeletedArray = fetchedData.filter((each) => {
      return each.id !== id;
    });
    setFetchedData(filterdDeletedArray);
  };

  // open popup
  const openPopup = (each) => {
    console.log("open popup");
    setIsedited({
      ...isEdited,
      status: true,
      rowDetails: {
        id: each.id,
        title: each.title,
        videoUrl: each.video_url,
        category: each.categoryName,
      },
    });
  };

  // close popup
  const closePopup = () => {
    console.log("close Popup");
    setIsedited({ status: false, rowDetails: {} });
  };

  return (
    <>
      <div className="main-container">
        <div className="add-video-card-main-div">
          <div className="add-category-box">
            <h2 className="main-heading">Add a category</h2>
            <p className="category-name-para">Category Name</p>
            <input
              value={categoryName}
              onChange={(event) => SetCategoryName(event.target.value)}
              className="caterogy-name-input caterogy-name-input-padding"
              type="text"
            />
            <button
              onClick={onCategoryAddButton}
              className="add-category-add-button"
            >
              Add
            </button>
          </div>
          <div className="add-category-box">
            <h2>Add a new video</h2>
            <label>Title</label>
            <input
              onChange={(event) => SetTitle(event.target.value)}
              className="caterogy-name-input"
              type="text"
              value={title}
            />
            <label>Video Link</label>
            <input
              value={url}
              onChange={(event) => SetUrl(event.target.value)}
              className="caterogy-name-input"
              type="text"
            />
            <label>Category</label>
            <select
              onChange={(event) => SetCategory(event.target.value)}
              className="options-class"
            >
              {addedCategoryArray.map((each) => (
                <option>{each.category}</option>
              ))}
            </select>
            <br />
            <button
              onClick={addVideoButtonSend}
              className="add-category-add-button"
            >
              Add
            </button>
          </div>
        </div>

        <div className="out-put-data-div">
          {addedCategoryArray.map((eachItem) => (
            <div className="category-output-data-div">
              <p className="each-category-head">{eachItem.category}</p>
              {fetchedData.map(
                (each) =>
                  eachItem.category === each.categoryName && (
                    <>
                      <div className="each-category-video-item">
                        <span className="video-item-spam-title">
                          {each.title}
                        </span>
                        {/*--------------------------------- Poput start--------------------------------- */}
                        <div className="all-popup-div">
                          <Popup
                            modal
                            trigger={<AiFillPlayCircle className="play-icon" />}
                          >
                            {(close) => (
                              <div className="poput-main-div">
                                <div className="popup-div">
                                  <div>
                                    <ReactPlayer
                                      controls="true"
                                      className="youtube-video-item"
                                      url={each.video_url}
                                    />
                                  </div>
                                  <div>
                                    <ImCross
                                      onClick={() =>
                                        close(onPlayButtonClick(each.id))
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </Popup>

                          <button
                            className="edit-click-btn"
                            onClick={() => openPopup(each)}
                          >
                            <AiFillEdit className="edit-icon-div" />
                          </button>
                          <button
                            className="delete-btn-div"
                            onClick={() => onClickDeletBtn(each.id)}
                          >
                            <AiFillDelete />
                          </button>
                        </div>
                        {/*--------------------------------- Poput end--------------------------------- */}
                      </div>
                    </>
                  )
              )}
            </div>
          ))}
        </div>
        {isEdited.status && (
          <UpdatePopup
            onUpdateFunction={onUpdateFunction}
            closePopup={closePopup}
            rowDetails={isEdited.rowDetails}
          />
        )}

        {/* ---------------------------------------- history ------------------------------------------------ */}
        <div className="history-div">
          <div className="clear-history-div">
            <h2>History</h2>
            <h4
              className="history-clear-text"
              onClick={() => onClickRemoveHistory()}
            >
              Clear History
            </h4>
          </div>
          {historyArray.length === 0 ? (
            <div className="you-didt-chat-div">
              <h3>You haven't watched anything yet.</h3>
            </div>
          ) : (
            <div>
              {historyArray.map((each) => (
                <div className="history-item-each-div">
                  <p className="history-data-para">{each.title}</p>
                  <p>{new Date().toLocaleString()}</p>
                  <Popup
                    modal
                    trigger={<AiFillPlayCircle className="play-icon" />}
                  >
                    {(close) => (
                      <div className="poput-main-div">
                        <div className="popup-div">
                          <div>
                            <ReactPlayer
                              controls="true"
                              className="youtube-video-item"
                              url={each.video_url}
                            />
                          </div>
                          <div>
                            <ImCross
                              onClick={() => close(onPlayButtonClick(each.id))}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
