/* eslint-disable array-callback-return */
import { AppCard } from "../components/AppCard";
import { EditCollapse } from "../components/EditCollapse";
import { ItemInfo } from "../components/ItemInfo";
import { NewCollapse } from "../components/NewCollapse";
import { Attributes } from "../types/appForm";
import { PersonalInfoType } from "../types/personalInfo";
import { QuestionInfoType } from "../types/questionInfo";
import { LABELS } from "../types/enum";

export const PersonalInfo = ({
  data,
  updateData,
}: {
  data: PersonalInfoType;
  updateData: (key: keyof Attributes, data: PersonalInfoType) => void;
}) => {
  const updateItemData = (key: keyof PersonalInfoType, comingData: any) => {
    const tmp = { ...data };
    tmp[key] = comingData;
    updateData("personalInformation", tmp);
  };
  const addQuestioData = (comingData: QuestionInfoType) => {
    const tmp = { ...data };
    tmp.personalQuestions.push(comingData);
    updateData("personalInformation", tmp);
  };
  const editQuestioData = (comingData: QuestionInfoType, index: number) => {
    const tmp = { ...data };
    tmp.personalQuestions[index] = comingData;
    updateData("personalInformation", tmp);
  };
  const delItem = (index: number) => {
    const tmp = { ...data };
    tmp.personalQuestions = tmp.personalQuestions.filter((_, i) => i !== index);
    updateData("personalInformation", tmp);
  };
  return (
    <AppCard title="Personal Information">
      {Object.entries(data).map(([key, val]) => {
        if (key !== "personalQuestions")
          return (
            <ItemInfo
              key={key}
              keyLabel={key as keyof PersonalInfoType}
              label={LABELS[key]}
              data={val}
              updateData={updateItemData}
            />
          );
      })}
      <EditCollapse
        items={data.personalQuestions}
        onSubmit={editQuestioData}
        delItem={delItem}
      />
      <NewCollapse onSubmit={addQuestioData} />
    </AppCard>
  );
};
