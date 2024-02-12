"use client";

import { api } from "~/trpc/react";

export const TaskList = (props: { id: string }) => {
  const professions =
    api.profession.getAll.useQuery({
      characterId: Number(props.id),
    }) && [];

  return (
    <div className="flex flex-wrap gap-8">
      {professions.length < 2 && (
        <div className="flex h-32 w-64 flex-col items-center justify-center gap-2 rounded-md bg-gray-600 p-4">
          <button className="text h-12 rounded-md border bg-gray-700 p-2 text-xl font-semibold tracking-tight">
            Add Profession
          </button>
        </div>
      )}
      {professions.map((profession, index) => {
        return (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-md bg-gray-600 p-4"
          >
            <h3 className="text-xl font-semibold tracking-tight">
              Profession Name
            </h3>
            <Task name="Mettle" done={true} />
            <Task name="Instructor Quest" done={true} />
            <Task name="Niffen/Consortium Quest" done={true} />
            <Task name="Crafting Orders" done={true} />
            <Task name="Treatise" done={true} />
            <Task name="Expedition Drops" done={true} />
            <Task name="World Drops" done={true} />
            <button className="text h-12 w-12 rounded-md border bg-gray-700">
              -
            </button>
          </div>
        );
      })}
    </div>
  );
};

const Task = (props: { name: string; done: boolean }) => {
  return (
    <div className="rounded-lg p-1 hover:bg-gray-500">
      <div className="m-1 flex w-64 items-center justify-between border-b-2 border-dotted">
        <h3>{props.name}</h3>
        <input
          className="m-1 h-5 w-5 "
          type="checkbox"
          defaultChecked={props.done}
        />
      </div>
    </div>
  );
};
