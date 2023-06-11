
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
    image: string;

    createdAt: string; 
}
