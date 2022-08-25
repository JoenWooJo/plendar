import React, { Component } from "react";
import "../../../../assets/css/cardFileUpload/cardFileUpload.css";
import Upload from "./FileUploads/Upload";

class FileUpload extends Component {
    render() {
        return (
            <div>
                <div className="Card">
                    <Upload />
                </div>
            </div>
        );
    }
}

export default FileUpload;