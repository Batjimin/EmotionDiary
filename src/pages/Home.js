import { useContext, useEffect, useState } from "react";
import MyHeader from './../components/MyHeader'
import MyButton from './../components/MyButton'
import DiaryList from "./../components/DiaryList";
import { DiaryStateContext } from "../App";

const Home = () => {

	const diaryList = useContext(DiaryStateContext);
	const [data,setData] = useState([]);

	const [curDate, setCurDate] = useState(new Date());
	const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`
	//Date는 0월부터 시작

	useEffect(()=>{
		if(diaryList.length >=1){
			const firstDay= new Date(
			curDate.getFullYear(),
			curDate.getMonth(),
			1 //1일
		).getTime();
		console.log(new Date(firstDay));//확인을 위한 코드

		const lastDay= new Date(
			curDate.getFullYear(),
			curDate.getMonth()+1,
			0 //한달 뒤의 0일. 마지막 날짜
		).getTime();
		
		setData(diaryList.filter((it)=> firstDay<=it.date && it.date <=lastDay));
		}	
	},[diaryList,curDate])

	useEffect(()=>{
		console.log(data);
	},[data]);

	const increaseMonth = () => {
		setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate()))
	}
	const decreaseMonth = () => {
		setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate()))
	}

	return (
		<div>
			<MyHeader headText={headText} 
				leftChild = {<MyButton text={'<'} onClick={decreaseMonth}/>}
				rightChild = {<MyButton text={'>'} onClick={increaseMonth}/>}
			/>
			<DiaryList diaryList={data}/>
		</div>
	);
};

export default Home;