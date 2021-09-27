import React, { Component } from 'react';
import Link from 'next/link';
import imageCompression from "browser-image-compression";

class CompressionImage extends Component {

    state = {
        compressedLink:
        "https://testersdock.com/wp-content/uploads/2017/09/file-upload-1280x640.png",
        originalImage: "",
        originalLink: "",
        clicked: false,
        uploadImage: false
    }

    handle = e => {
        const imageFile = e.target.files[0];
        this.setState({
            originalLink: URL.createObjectURL(imageFile),
            originalImage: imageFile,
            outputFileName: imageFile.name,
            uploadImage: true
        });
    };
    
    changeValue = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    
    click = e => {
        e.preventDefault();
    
        const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 800,
            useWebWorker: true
        };
    
        if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
            alert("Bring a bigger image");
            return 0;
        }
    
        let output;
        imageCompression(this.state.originalImage, options).then(x => {
            output = x;
    
        const downloadLink = URL.createObjectURL(output);
            this.setState({
                compressedLink: downloadLink
            });
        });
    
        this.setState({ clicked: true });
        return 1;
    };
    

    render() {
        return (
            <div className="w-[90%] m-auto">
                <div className="text-center">
                    <h1 className="text-5xl text-blue-400">Image Compressor</h1>
                </div>

                <div className="flex flex-row mt-5">
                    <div className="w-[80%] m-auto">
                        {this.state.uploadImage ? (
                        <div
                            src={this.state.originalLink}
                        ></div>
                        ) : (
                        <div
                            src="https://testersdock.com/wp-content/uploads/2017/09/file-upload-1280x640.png"
                        ></div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="mt-8 p-4 w-full bg-transparent text-blue-400 border border-blue-400"
                            onChange={e => this.handle(e)}
                        />
                    </div>
                </div>

                <div className="w-[80%] m-auto mt-8 p-4 text-blue-400 border border-blue-400">
                    {this.state.outputFileName ? (
                    <button
                        type="button"
                        className="p-3 bg-blue-400 border-blue-400 text-white rounded-sm m-2 hover:bg-white 
                            hover:border hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
                        onClick={e => this.click(e)}
                    >
                        Compress
                    </button>
                    ) : (
                    <></>
                    )}
                </div>

                <div className="w-[80%] m-auto mt-8 p-4 text-blue-400 border border-blue-400">
                    <div variant="top" src={this.state.compressedLink}></div>
                    {this.state.clicked ? (
                    <a
                    href={this.state.compressedLink}
                    download={this.state.outputFileName}
                    className="p-3 bg-blue-400 border-blue-400 text-white rounded-sm m-2 hover:bg-white 
                    hover:border hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
                    >
                    Download
                    </a>
                    ) : (
                    <></>
                    )}
                </div>
                <div className="w-[80%] m-auto mt-8 mb-4 text-center">
                        <span className="text-xl">
                            Developed by: 
                            <Link href="/">
                                <span className="text-xl text-blue-400 cursor-pointer"> Abbas Msheik</span>
                            </Link>
                        </span>
                </div>
            </div>
        )
    }
}

export default CompressionImage;