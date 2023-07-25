import React, { useEffect, useRef } from "react";

const CKEditor = ({ onChange, editorLoaded, name, value }) => {
    const editorRef = useRef();
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        };
    }, []);

    return (
        <>
            {editorLoaded ? (
                <CKEditor
                    type=""
                    name={name}
                    editor={ClassicEditor}
                    data={value}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        onChange(data);
                    }}
                    config={{
                        toolbar: [
                            'heading',
                            '|',
                            'bold',
                            'italic',
                            // 'outdent',
                            // 'indent',
                            'bulletedList',
                            'numberedList',
                            'blockQuote',
                            '|',
                            'link',
                            // 'insertTable',
                            'imageUpload',
                            // 'mediaEmbed',
                            '|',
                            'undo',
                            'redo',
                        ],
                        heading: {
                            options: [
                                {
                                    model: 'paragraph',
                                    view: 'p',
                                    title: 'Paragraph',
                                    class: 'ck-heading_paragraph'
                                },
                                {
                                    model: 'heading1',
                                    view: 'h1',
                                    title: 'Heading 1',
                                    class: 'ck-heading_heading1'
                                },
                                {
                                    model: 'heading2',
                                    view: 'h2',
                                    title: 'Heading 2',
                                    class: 'ck-heading_heading2'
                                },
                                {
                                    model: 'heading3',
                                    view: 'h3',
                                    title: 'Heading 3',
                                    class: 'ck-heading_heading3'
                                }
                            ]
                        },
                        fontSize: {
                            options: [
                                9,
                                10,
                                11,
                                12,
                                13,
                                14,
                                15,
                                16,
                                17,
                                18,
                                19,
                                20,
                                21,
                                23,
                                25,
                                27,
                                29,
                                31,
                                33,
                                35
                            ]
                        },
                        // alignment: {
                        //     options: ['justify', 'left', 'center', 'right']
                        // },
                        // table: {
                        //     contentToolbar: [
                        //         'tableColumn',
                        //         'tableRow',
                        //         'mergeTableCells'
                        //     ]
                        // },
                    }}
                />
            ) : (
                <div>Editor loading</div>
            )}
        </>
    )
}

export default CKEditor