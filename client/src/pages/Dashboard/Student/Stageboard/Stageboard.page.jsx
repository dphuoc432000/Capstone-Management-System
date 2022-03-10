import React, { useState } from "react";
import Body from "../../../../components/Body/Body.component";
import ItemButton from "../../../../components/Stageboard/ItemButton/ItemButton.component";
import Stage from "../../../../components/Stageboard/Stage/Stage.component";
import styles from "./Stageboard.module.scss";

function Taskboard() {
    const [stages, setStages] = useState([
        {
            stageId: "2c82225f-2a6c-45d3-b18a-1132712a4234",
            title: "Sprint 1",
            desc: "Design and document in the project",
            editedAt: "3 days ago",
        },
        {
            stageId: "3c82225f-2a6c-45d3-b18a-1132712a4234",
            title: "Sprint 2",
            desc: "Code and Test in the project",
            editedAt: "1 days ago",
        },
    ]);

    const addStage = (stage) => {
        stages.push({ ...stage, editedAt: "Don't edit anything" });
        setStages([...stages]);
    }

    return (
        <div className={styles["stage-board"] + " w-100 d-flex align-items-center"}>
            <Body>
                <div className="w-100 h-100">
                    <h1 className="text-center mb-5">Stageboard</h1>
                    <div className={styles["stage-board_list-stage"] + " d-flex justify-content-center p-3"}>
                        {stages.map((stage, stageIndex) => (
                            <div className={styles["stage-board_stage"] + " mr-4"}>
                                <Stage
                                    key={stageIndex}
                                    stageId={stage.stageId}
                                    title={stage.title}
                                    desc={stage.desc}
                                    editedAt={stage.editedAt}
                                />
                            </div>
                        ))}
                        <div className={styles["stage-board_stage"]}>
                            <ItemButton addItem={addStage} />
                        </div>

                    </div>
                </div>
            </Body>
        </div>
    );
}

export default Taskboard;
