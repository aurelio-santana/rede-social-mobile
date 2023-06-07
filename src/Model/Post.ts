
export interface Post {
    id: string,
    title: string,
    content: string,
    name: string,

    comment: [
        {
            id: string;
            name: string;
            content: string;
            createdAt: string;
        }
    ];
    like: string[];
    likes: number;
    image: boolean;

    createdAt: string; 
}

/* export interface Post {
    _id: string,
    title: string,
    description: string,
    profile: {
        name: string;
    };
    comments: [];
    likes: string[];
    image: boolean; 
} */

