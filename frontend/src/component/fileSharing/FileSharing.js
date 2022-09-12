import React from 'react';
import Files from './Files'

import FileManager, { Permissions } from 'devextreme-react/file-manager';
import RemoteFileSystemProvider from 'devextreme/file_management/remote_provider';
import { Popup } from 'devextreme-react/popup';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const remoteProvider = new RemoteFileSystemProvider({
  endpointUrl: 'https://js.devexpress.com/Demos/Mvc/api/file-manager-file-system-images'
});

class FileSharing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPath: 'Widescreen',
      popupVisible: false,
      imageItemToDisplay: {}
    };

    this.displayImagePopup = this.displayImagePopup.bind(this);
    this.hideImagePopup = this.hideImagePopup.bind(this);
    this.onCurrentDirectoryChanged = this.onCurrentDirectoryChanged.bind(this);
  }

  displayImagePopup(e) {
    this.setState({
      popupVisible: true,
      imageItemToDisplay: {
        name: e.file.name,
        url: e.file.dataItem.url
      }
    });
  }

  hideImagePopup() {
    this.setState({
      popupVisible: false
    });
  }

  onCurrentDirectoryChanged(e) {
    this.setState({
      currentPath: e.component.option('currentPath')
    });
  }

  render() {
    return (
      <div className="col-xl-11 ml-4">
        <div className="card-header py-3">
          <h4 className="m-0 font-weight-bold text-primary"><AttachFileIcon fontSize="large" /> &nbsp;File Sharing</h4>
        </div>
        <div className="card-body" style={{ height: "750px", overflow: "auto" }} >
          <FileManager
            currentPath={this.state.currentPath}
            // 파일 받아오기
            fileSystemProvider={Files}
            onSelectedFileOpened={this.displayImagePopup}
            onCurrentDirectoryChanged={this.onCurrentDirectoryChanged}>
            <Permissions
              create={true}
              copy={true}
              move={true}
              delete={true}
              rename={true}
              upload={true}
              download={true}>
            </Permissions>
          </FileManager>

          <Popup
            maxHeight={600}
            hideOnOutsideClick={true}
            title={this.state.imageItemToDisplay.name}
            visible={this.state.popupVisible}
            onHiding={this.hideImagePopup}
            className="photo-popup-content">

            <img src={this.state.imageItemToDisplay.url} className="photo-popup-image" />
          </Popup>
        </div>
      </div>
    );
  }
}
export default FileSharing;