import { ecommerceApi } from '@/redux/api';

export const imageApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadSingleImage: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: 'images/single',
                    method: 'POST',
                    body: formData,
                };
            },
        }),
        uploadMultipleImages: builder.mutation({
            query: (files) => {
                const formData = new FormData();
                files.forEach((file:any) => formData.append('files', file));
                return {
                    url: 'images/multiple',
                    method: 'POST',
                    body: formData,
                };
            },
        }),
        deleteImageByFilename: builder.mutation({
            query: (filename) => ({
                url: `file/${filename}`,
                method: 'DELETE',
            }),
        }),
        downloadImageByFilename: builder.query({
            query: (filename) => ({
                url: `file/download/${filename}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useUploadSingleImageMutation,
    useUploadMultipleImagesMutation,
    useDeleteImageByFilenameMutation,
    useDownloadImageByFilenameQuery,
} = imageApi;

