import React, { Component } from "react";
import Dropzone from "react-dropzone";

class ImageUpload extends Component {
    state = {
        files: []
    }

    onDrop = (files) => {
        this.setState({
            files: [
                ...files,
                ...this.state.files
            ]
        }, () => {
            this.props.onChange(this.state.files);
        });
    }

    render() {
        const { readOnly, name, files } = this.props;
        const tempFiles = this.state.files.map((file) => (
            <li key={file.path} className="image-wrapper">
                <img className="image-thumbnail" src={URL.createObjectURL(file)}/>
            </li>
        ));
        const uploadedFiles = files.map((img, i) => (
            <li className="image-wrapper" key={i}>
                <img className="image-thumbnail" src={`/api/images/${img.image_name}`}/>
            </li>
        ));
        return (
            <Dropzone onDrop={this.onDrop} accept="image/jpeg, image/png">
                {({ getRootProps, getInputProps }) => (
                    <section className="image-upload">
                        <aside>
                            <ul className="upload-image-list">
                                <li {...getRootProps({ className: `dropzone image-wrapper ${readOnly ? "readOnly" : ""}` })}>
                                    <input {...getInputProps()} name={name}/>
                                    <p className="text-light">
                                        <i className="far fa-upload"></i>
                                        <span>Upload</span>
                                    </p>
                                </li>
                                {tempFiles}
                                {uploadedFiles}
                            </ul>
                        </aside>
                    </section>
                )}
            </Dropzone>
        );
    }
}

export default ImageUpload;
