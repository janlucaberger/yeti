import React from 'react'
import Dropzone from 'react-dropzone';
import FontAwesome from 'react-fontawesome';
import TimeAgo from 'react-timeago'

class IssueAttachments extends React.Component {
  constructor(props) {
    super(props)
    this.state = { files: [] }
    this.handleFileUrl = this.handleFileUrl.bind(this)
    this.renderFilePreview = this.renderFilePreview.bind(this)
    this.deleteAttachment = this.deleteAttachment.bind(this)
  }

  onDrop(files) {
    this.setState({
      files
    }, this.handleSubmit);
  }

  handleFileUrl(e){
    const reader = new FileReader();

    const file = this.state.files[0];
    reader.onloadend = () => {
      this.setState({ attachment_url: reader.result, attachment_file: file});
    }
    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ attachment_url: "", attachment_file: null });
    }
  }

  handleSubmit(){
    const formData = new FormData();
    const file = this.state.files[0];
    formData.append("issue[id]", this.props.issueId);
    if (file) formData.append("issue[attachment]", file);

    this.props.addAttachment(formData)
  }

  deleteAttachment(attachmentId, issue_id){
    return (e) => {
      const params = { attachment_id: attachmentId, issue_id: issue_id}

      this.props.deleteAttachment(params)
    }
  }


  renderFilePreview(file){

    if(file){
      const contentType = file.attachment_content_type.split("/")
      const fileName = file.attachment_file_name.slice(0,20)
      if(contentType.includes("image")){
        return (
            <div key={file.id} className="issue-attachment-preview-container">
              <a href={file.attachment_url} target="_blank">
                <div style={{backgroundImage: `url(${file.attachment_url})`}} className="issue-attachment-preview-image" height="60px"/>
                <div className="issue-attachment-file-name">{fileName}</div>
              </a>
              <div className="issue-attachment-preview-button-container">
                <TimeAgo date={file.created_at} />
                <FontAwesome onClick={this.deleteAttachment(file.id, file.issue_id)}name="trash" />
              </div>
            </div>
        )
      } else if (contentType.includes("pdf")){
        return (
          <div key={file.id} className="issue-attachment-preview-container">
            <a href={file.attachment_url} target="_blank">
              <div style={{backgroundImage: "url(https://s3.amazonaws.com/yetiapp-assets/pdf_placeholder.png)"}} className="issue-attachment-preview-image" height="60px"/>
              <div className="issue-attachment-file-name">{fileName}</div>
            </a>
            <div className="issue-attachment-preview-button-container">
              <TimeAgo date={file.created_at} />
              <FontAwesome onClick={this.deleteAttachment(file.id, file.issue_id)}name="trash" />
            </div>
          </div>
        )
      } else {
        <div key={file.id} className="issue-attachment-preview-container">
          <a href={file.attachment_url} target="_blank">
            <div className="issue-attachment-preview-image" height="60px"/>
            <div className="issue-attachment-file-name">{fileName}</div>
          </a>
          <div className="issue-attachment-preview-button-container">
            <TimeAgo date={file.created_at} />
            <FontAwesome onClick={this.deleteAttachment(file.id, file.issue_id)}name="trash" />
          </div>
        </div>
      }
    }
  }


  render(){
    const dropzoneCustom = {
      width: "inherit",
      height: "50px",
      borderWidth: "1.4px",
      borderColor: "rgb(102, 102, 102)",
      borderStyle: "dashed",
      borderRadius: "3px",
      alignItems: "center",
      justifyContent: "center",
      display: "flex"
    }

    let mappedAttachments = ""

    if(this.props.attachments){
      mappedAttachments = this.props.attachments.map ((attachment) => {
        return (
          this.renderFilePreview(attachment)
        )
      })
    }

    return (
      <section>
        <div className="dropzone">
          <aside>
            <div className="issue-detail-section-header">Attachments</div>
          </aside>
          <Dropzone style={dropzoneCustom} onDrop={this.onDrop.bind(this)}>
            <p>Click or drop in new attachments</p>
          </Dropzone>
        </div>

        <div className="issue-attachment-previews-container">
          {mappedAttachments}
        </div>
      </section>
    );
  }
}

export default IssueAttachments
