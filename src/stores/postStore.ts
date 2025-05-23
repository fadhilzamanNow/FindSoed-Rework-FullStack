import { defineStore } from "pinia";
import { ref } from "vue";

export type PostType = {
    itemName : string,
    itemDetail : string,
    userName : string,
    itemCategory : string,
    status : string,
    images : string[],
    likeNum : number,
    commentNum : number,
    id : string,
    userProfile : string
}

type postStoreState = {
    postData : Array<PostType> | null,
    isLoading : boolean,
    detailPost : PostType | {}
}

export const usePostStore = defineStore('post', () => {
    const postState = ref<PostType[] | null >(null);
    const isLoading = ref<postStoreState['isLoading']>(false);
    const detailPost = ref<postStoreState['detailPost']>({});

    const setPost = (posts : postStoreState['postData']) => {
            postState.value = posts
    }

    const toggleLoading = () => {
        isLoading.value = !isLoading.value
    }

    const setDetailPost = (detail : postStoreState['detailPost']) => {
        detailPost.value = detail
    }

    return {postState, isLoading, detailPost, setPost, toggleLoading, setDetailPost} 
        
})









