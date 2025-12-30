import PostEditForm from "../_components/post-edit-form";

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);

  return (
    <div className="flex flex-col w-full h-[calc(100dvh-56px)]">
      <PostEditForm postId={postId} />
    </div>
  );
}
