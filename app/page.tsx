"use client";
import { useState } from "react";
import Button from "@components/Button";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styles from "styles/Home.module.css";

export default function Home() {
  // "" : 위의 행과 병합
  // & : 왼쪽 열과 병합
  // -1 : 빈 데이터
  // 배열 : row 행 하나씩 읽는다
  const [dataList, setDataList] = useState([
    [
      "대학",
      "모집단위",
      "&",
      "계열",
      "모집인원",
      "&",
      "&",
      "&",
      "&",
      "&",
      "&",
      "&",
      "&",
      "계",
      "캠퍼스"
    ],
    ["", "", "", "", "가군", "&", "&", "&", "&", "나군", "&", "&", "&", "", ""],
    [
      "",
      "",
      "",
      "",
      "수능",
      "&",
      "&",
      "&",
      "화새부9종합1터",
      "수능",
      "&",
      "&",
      "&",
      "",
      ""
    ],
    [
      "",
      "",
      "",
      "",
      "일반",
      "농어촌",
      "특성화고교졸업자",
      "초생활수급자",
      "-특활고졸업자재직자",
      "일반",
      "농어촌",
      "성화얼i졸업자년터",
      "초생활수급및차상우7계층그사",
      "",
      ""
    ],
    [
      "공과",
      ".........",
      "&",
      "자연",
      "6723222576",
      "42222",
      "2222",
      "22",
      "-1",
      "341828",
      "222",
      "-1",
      "222",
      "7538223227262918",
      "서울"
    ],
    [
      "Al응합",
      "AI소프트웨어응합학부",
      "컴퓨미서화소프트웨어공학인공지능L데이터사이언스엔터터인터트테크놀로지",
      "자연",
      "-1",
      "-1",
      "-1",
      "-1",
      "-1",
      "인문8자연78",
      "1",
      "2",
      "-1",
      "95",
      "서울"
    ],
    [
      "사범",
      "교육학과국어고육과역사교육과지리교육과수학교육과가정고육과체육교육과",
      "&",
      "인문자연예체능",
      "72137272727373",
      "-1",
      "-1",
      "-1",
      "-1",
      "-1",
      "-1",
      "-1",
      "-1",
      "12131212121313",
      "서울"
    ],
    [
      "예술",
      "불교미술교적미술학부조소연극학부연극교적)유지업교직영화영상학과교직",
      "&",
      "예체능",
      "1276",
      "2",
      "2",
      "-1",
      "-1",
      "7575",
      "-1",
      "-1",
      "-1",
      "12131212121313",
      "서울"
    ],
    [
      "0F55",
      "약학과",
      "&",
      "LO",
      "-1",
      "-1",
      "-1",
      "-1",
      "-1",
      "2)1",
      ")",
      "-1",
      "3",
      "11",
      "년@메HO"
    ],
    [
      "래움합터",
      "움합보안학과사회복지상담학과글로벌무역학과",
      "&",
      "9[L규",
      "-1",
      "-1",
      "-1",
      "-1",
      "777",
      "-1",
      "-1",
      "-1",
      "-1",
      "777",
      "서울"
    ]
  ]);
  const [clickedCell, setClickedCell] = useState({ name: "", row: 0, col: 0 });
  const [opened, { open, close }] = useDisclosure(false);

  const rowCheck = (row: number, col: number) => {
    let rowSpan = 1;

    if ("" === dataList[row][col]) {
      rowSpan = -1;
    } else {
      for (let i = row + 1; i < dataList.length; i++) {
        if ("" === dataList[i][col]) {
          rowSpan++;
        } else {
          break;
        }
      }
    }

    return rowSpan;
  };

  const colCheck = (row: number, col: number) => {
    const std = dataList[row][col];
    let colSpan = 1;

    if (std !== "&") {
      for (let i = col + 1; i < dataList[row].length; i++) {
        if ("&" === dataList[row][i]) {
          colSpan++;
        } else {
          break;
        }
      }
    } else {
      colSpan = -1;
    }
    return { colSpan: colSpan, name: std };
  };

  const renderCell = () => {
    return dataList.map((rowElemnt, index1) => (
      <tr key={"tr_" + index1}>
        {rowElemnt.map((colElemnt, index2) => {
          const resRow = rowCheck(index1, index2);
          const resCol = colCheck(index1, index2);
          const id = "td_" + index1 + "_" + index2 + "_" + resCol.name;

          if (resRow > -1 && resCol.colSpan > -1) {
            return (
              <td
                key={id}
                id={id}
                rowSpan={resRow}
                colSpan={resCol.colSpan}
                onClick={() =>
                  setClickedCell({ name: id, row: index1, col: index2 })
                }
                height={resRow * 30}
                style={{
                  backgroundColor:
                    clickedCell.row === index1 && clickedCell.col === index2
                      ? "aquamarine"
                      : "white",
                  border: "1px solid black"
                }}
              >
                {resCol.name === "-1" ? "" : resCol.name}
              </td>
            );
          }
        })}
      </tr>
    ));
  };
  const handleAddRow = () => {
    const tmpDataList = [...dataList];
    tmpDataList.splice(clickedCell.row, 0, dataList[clickedCell.row]);
    setDataList(tmpDataList);
  };
  const handleDeleteRow = () => {
    const tmpDataList = [...dataList];
    tmpDataList.splice(clickedCell.row, 1);
    setDataList(tmpDataList);
  };
  const handleDivideCol = () => {
    const tmpDataList = dataList.map((v) => [...v]); //deep clone
    if (tmpDataList[clickedCell.row][clickedCell.col + 1] === "&") {
      //이미 병합된 셀이라면
      tmpDataList[clickedCell.row][clickedCell.col + 1] =
        tmpDataList[clickedCell.row][clickedCell.col];
    } else {
      //전체 열 새롭게 추가
      for (let i = 0; i < tmpDataList.length; i++) {
        const std = tmpDataList[i][clickedCell.col];
        if (i === clickedCell.row || (i > clickedCell.row && std === "")) {
          tmpDataList[i].splice(clickedCell.col + 1, 0, std);
        } else {
          tmpDataList[i].splice(clickedCell.col + 1, 0, "&");
        }
      }
    }
    setDataList(tmpDataList);
  };
  const handleDivideRow = () => {
    const tmpDataList = dataList.map((v) => [...v]); //deep clone
    const tmpRow = [];
    //이미 병합된 셀이라면
    if (
      clickedCell.row + 1 < dataList.length &&
      dataList[clickedCell.row + 1][clickedCell.col] === ""
    ) {
      //기존 병합된 값 "" -> 데이터를 넣어서 병합 해제
      tmpDataList[clickedCell.row + 1][clickedCell.col] =
        tmpDataList[clickedCell.row][clickedCell.col];
    } else {
      //새로운 행 추가
      for (let i = 0; i < dataList[clickedCell.row].length; i++) {
        if (i === clickedCell.col || dataList[clickedCell.row][i] === "&") {
          //해당 열만 나누기
          tmpRow.push(dataList[clickedCell.row][i]);
        } else {
          //다른 열들은 병합 처리
          tmpRow.push("");
        }
      }
      //중간에 행 추가
      tmpDataList.splice(clickedCell.row + 1, 0, tmpRow);
    }

    setDataList(tmpDataList);
  };
  const handleMergeCheck = (arr: string[]) => {
    let colMergeCnt = 1;
    let rowMergeCnt = 0;
    for (let j = 0; j < arr.length; j++) {
      if (colMergeCnt === j - clickedCell.col && arr[j] === "&") {
        //해당 열이 병합되었는지 확인(몇개의 셀로 병합되었는지)
        colMergeCnt++;
      } else if (arr[j] === "") {
        //해당 열 빼고 나머지 열이 모두 병합되어 있는지
        //즉, 행 나누기로 생긴 열인지 체크
        rowMergeCnt++;
      }
    }
    return {
      cnt: colMergeCnt,
      res: colMergeCnt + rowMergeCnt === arr.length
    };
  };
  const handleMergeRow = () => {
    const tmpDataList = dataList.map((v) => [...v]); //deep clone
    // 선택된 col 병합 체크
    const stdMergeCnt = handleMergeCheck(tmpDataList[clickedCell.row]).cnt;
    for (let i = clickedCell.row + 1; i < dataList.length; i++) {
      //row 병합 체크
      if (tmpDataList[i][clickedCell.col] !== "") {
        // 아래줄 col 병합 체크
        const nextMerge = handleMergeCheck(tmpDataList[i]);
        if (stdMergeCnt === nextMerge.cnt) {
          if (nextMerge.res) {
            //'행 나누기'로 인해 만들어진 행인 경우
            //전체 행 머지(해당 행 삭제)
            tmpDataList.splice(clickedCell.row + 1, i - clickedCell.row);
          } else {
            //해당 셀만 머지
            tmpDataList[i][clickedCell.col] = "";
          }
          setDataList(tmpDataList);
        } else {
          open();
        }
        break;
      }
    }
  };
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <table className={styles.table}>
        <thead></thead>
        <tbody>{renderCell()}</tbody>
      </table>
      <div className={styles.btns}>
        <Button onClick={handleAddRow}>아래행 추가</Button>
        {/* <Button onClick={handleDeleteRow}>행삭제</Button> */}
        <Button onClick={handleDivideCol}>열 나누기</Button>
        <Button onClick={handleDivideRow}>행 나누기</Button>
        <Button onClick={handleMergeRow}>아래셀합치기</Button>
      </div>
      <Modal opened={opened} onClose={close}>
        <Modal.Body style={{ textAlign: "center" }}>
          해당 작업은 불가합니다.
        </Modal.Body>
      </Modal>
    </div>
  );
}
