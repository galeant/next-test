import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";
import { useSelector } from "react-redux";

const TinymceEditor = ({ onChange, value, name, formData, setFormData }) => {
    const token = useSelector((state) => state.auth.token);
    const editorRef = useRef(null);

    const uploadImageHandler = async (blobInfo, success, progress) => new Promise((resolve, reject) => {
        const body = new FormData();
        body.append('files', blobInfo.blob(), blobInfo.filename());
        axios({
            url: 'http://api-pristine-revamp.local/admin/image-upload',
            method: 'post',
            data: body,
            headers: {
                'Content-Type': 'multipart/form-data;',
                Authorization: `Bearer ${token}`
            },
            withCredentials: false
        }).then(response => {
            resolve(response.data.data.url);
        }).catch(response => {
            reject('Upload failed');
        });
    })

    return (
        <>
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                apiKey={'6x68dkf8sltpryrxypmb1vvttp940ysyt2y77r0gn3aw6rdf'}
                init={{
                    convert_urls: false,
                    images_upload_handler: uploadImageHandler,
                    height: 500,
                    menubar: true,
                    plugins: 'advlist autolink lists link image charmap preview anchor ' +
                        'searchreplace visualblocks code fullscreen ' +
                        'insertdatetime media table code help wordcount'
                    ,
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                value={value}
                onEditorChange={(content, editor) => {
                    onChange(content);
                }}
            />
        </>
    );
}

export default TinymceEditor