"use client";

import api from "@/api/api";
import Page from "@/components/Page";
import PostByLoungeIdFeed from "@/components/PostByLoungeIdFeed";
import UpdateLoungeModal from "@/components/UpdateLoungeModal";
import { LoungeIdPropsType } from "@/types/lounge.types";
import { useModalStore } from "@/zustand/modal.store";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import { LuFilePlus } from "react-icons/lu";
import FollowLoungeBtn from "../../../../../../components/FollowLoungeBtn";

function LoungeDetailForm({
  loungeId,
  type,
}: {
  loungeId: number;
  type: LoungeIdPropsType["searchParams"]["type"];
}) {
  const openModal = useModalStore((state) => state.openModal);

  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => api.posts.getPostsByLoungeId(Number(loungeId)),
  });

  const { data: lounge } = useQuery({
    queryKey: ["lounge"],
    queryFn: async () => api.lounges.getLounge(loungeId),
  });

  if (type === "popular") {
    posts.sort((postA, postB) => postB.likes.length - postA.likes.length);
  } else if (type === "newest") {
    posts.sort((postA, postB) =>
      dayjs(postB.createdAt).isAfter(postA.createdAt) ? 1 : -1
    );
  }
  const handleClickOpenModal = () => {
    openModal(<UpdateLoungeModal />);
  };

  return (
    <Page>
      <div className="pb-5 flex flex-row gap-x-4">
        <div className="hover:scale-110 hover:duration-300">
          <img
            src={lounge?.imageUrl}
            className="w-40 h-40 rounded-md object-cover"
          />
        </div>

        <div className="mt-auto flex flex-col h-full">
          <h1 className="font-bold text-4xl">{lounge?.name}</h1>
          <p className="pt-10 pb-2 font-semibold text-xl">
            {lounge?.introduction}
          </p>
        </div>
      </div>

      <div className="w-full px-8 rounded-md bg-[#FCA261] h-14 flex flex-row items-center text-white text-base font-bold text-center">
        <div className="flex flex-row">
          <Link href={`/lounges/${loungeId}?type=popular`}>
            <div className="px-3 py-2 hover:bg-[#FF9648] active:scale-110 active:duration-150 hover:rounded-md hover:duration-300">
              <p>인기 게시물</p>
            </div>
          </Link>

          <Link href={`/lounges/${loungeId}?type=newest`}>
            <div className="px-3 py-2 hover:bg-[#FF9648] active:scale-110 active:duration-150 hover:rounded-md hover:duration-300">
              <p>최신 게시물</p>
            </div>
          </Link>
          {/* 모달  */}
          <button onClick={handleClickOpenModal}>
            <div className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border hover:bg-[#FF9648] hover:duration-300 active:scale-110">
              수정하기
            </div>
          </button>
        </div>

        <div className="ml-auto flex flex-row gap-x-3">
          <FollowLoungeBtn loungeId={loungeId} />

          <Link href={`/lounges/${loungeId}/posts/new`}>
            <div className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border hover:bg-[#FF9648] hover:duration-300 active:scale-110">
              <LuFilePlus />
              <p>글 쓰기</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-10 flex flex-row justify-around">
        <ul className="grid grid-cols-4 gap-10 justify-center">
          {posts
            .map((post) => (
              <li
                key={post.id}
                className="w-80 h-[480px] p-4 bg-white rounded-md grid hover:scale-105 hover:duration-300"
              >
                <PostByLoungeIdFeed post={post} />
              </li>
            ))
            .slice(0, 8)}
        </ul>
      </div>
    </Page>
  );
}

export default LoungeDetailForm;
