import { Exclude, Expose, Type } from 'class-transformer';

class CommentWriter {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    email: string;
}

@Exclude()
export class CommentResponseDto {
    @Expose()
    id: number;

    @Expose()
    content: string;

    @Expose()
    postId: number;

    @Expose()
    writerId: number;

    @Expose()
    @Type(() => CommentWriter)
    writer: CommentWriter;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
