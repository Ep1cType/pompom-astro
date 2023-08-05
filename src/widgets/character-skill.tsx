import type { CharacterMainSkill } from "shared/api/character/type";
import { createSignal } from "solid-js";

type Props = {
  skill: CharacterMainSkill;
};

export const CharacterSkill = ({ skill }: Props) => {
  const [initialSkill, setInitialSkill] = createSignal(0);

  const skillLevelList = Object.values(skill.description) as string[];
  const maxSkillLevel = skillLevelList.length - 1;

  return (
    <div class="flex flex-col rounded-2xl bg-blue-900 px-4 py-4">
      <h3 class="mb-1 text-base font-bold">{skill.name}</h3>
      <p class="mb-2 text-sm font-medium text-orange-300">{skill.type}</p>
      <p
        class="flex-grow text-base/snug [&>span]:font-bold"
        innerHTML={skillLevelList[initialSkill()]}
      />

      {skillLevelList.length > 1 && (
        <div class="mt-4">
          <span class="mr-2">Уровень: {initialSkill()}</span>
          <p class="inline space-x-1">
            <input
              class="range range-accent range-xs"
              type="range"
              min={0}
              max={maxSkillLevel}
              value={initialSkill()}
              oninput={(event) =>
                setInitialSkill(Number(event.currentTarget.value))
              }
            />
          </p>
        </div>
      )}
    </div>
  );
};
