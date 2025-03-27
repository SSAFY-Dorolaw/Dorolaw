import ArticleItem from '@/features/board/ArticleItem';
import { useNavigate } from 'react-router-dom';

interface article {
  id: number;
  writer: string;
  title: string;
  tag1: string;
  tag2: string;
  answercount: number;
  recentanswer: string;
  lawyer: string;
}

function ArticleList() {
  const navigate = useNavigate();
  const articleList: article[] = [
    {
      id: 1,
      writer: '의뢰자_1234',
      title: '교차로 내 차선변경 접촉사고',
      tag1: '#차대차',
      tag2: '#교차로',
      answercount: 4,
      recentanswer: '영상을 보니 6:4로 보입니다.',
      lawyer: '나해결',
    },
    {
      id: 2,
      writer: '의뢰자_1234',
      title: '교차로 내 차선변경 접촉사고',
      tag1: '#차대차',
      tag2: '#교차로',
      answercount: 4,
      recentanswer: '영상을 보니 6:4로 보입니다.',
      lawyer: '나해결',
    },
    {
      id: 3,
      writer: '의뢰자_1234',
      title: '교차로 내 차선변경 접촉사고',
      tag1: '#차대차',
      tag2: '#교차로',
      answercount: 4,
      recentanswer: '영상을 보니 6:4로 보입니다.',
      lawyer: '나해결',
    },
    {
      id: 4,
      writer: '의뢰자_1234',
      title: '교차로 내 차선변경 접촉사고',
      tag1: '#차대차',
      tag2: '#교차로',
      answercount: 4,
      recentanswer: '영상을 보니 6:4로 보입니다.',
      lawyer: '나해결',
    },
  ];

  return (
    <div className="mt-10 space-y-4">
      {articleList.map((article) => (
        <ArticleItem
          key={article.id}
          writer={article.writer}
          title={article.title}
          tag1={article.tag1}
          tag2={article.tag2}
          answercount={article.answercount}
          recentanswer={article.recentanswer}
          lawyer={article.lawyer}
          onClick={() => void navigate('/consultation/detail')}
        />
      ))}
    </div>
  );
}

export default ArticleList;
