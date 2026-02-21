import { supabase } from "@/lib/supabase";
import {PostInput} from "@/types/types";
import {Pagination} from "@supabase/supabase-js";

type StorageInput = {
    fileName: string;
    fileExtension: string;
    fileBuffer: Uint8Array;
};

type Paginationinput = {
    cursor?: string;
    limit?: number;
}

export const fetchPosts = async (pageParams: Pagination) => {
      let query = supabase
        .from('posts')
        .select('*, user:profiles(*), nrOfComments:comments(count)')
        .order('id', { ascending: false })

    if(pageParams.limit) {
        query = query.limit(pageParams.limit);
    }

    if(pageParams.cursor) {
        query = query.lt('id', pageParams.cursor);
    }
    const { data, error } = await query.throwOnError();
    return data;
}

export const uploadVideoToStorage = async (storageProps: StorageInput) => {
     const { fileName, fileExtension, fileBuffer } = storageProps;

     const { data, error } = await supabase.storage
         .from('videos')
         .upload(fileName, fileBuffer, {
             contentType: `video/${fileExtension}`
         });
     if (error) throw error;

     const { data: urlData } = supabase.storage
         .from('videos')
         .getPublicUrl(fileName);

     return urlData.publicUrl;
}

export const createPost = async (newPosts: PostInput) => {
    const { data, error } = await supabase
        .from('posts')
        .insert([newPosts])
        .throwOnError()

    if (error) throw error;
    return data;
}