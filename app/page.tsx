import { loadExercise } from '@/lib/exercises';
import ExerciseView from './ExerciseView';

export default function ExercisePage() {
  const exercise = loadExercise('01-additionner-deux-nombres');



  return (
    <ExerciseView
      title={exercise.meta.title}
      statement={exercise.statement}
      starterCode={exercise.starterCode}
      hints={exercise.hints}
    />

  );
}