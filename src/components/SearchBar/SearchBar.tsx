import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";
import { Formik, Form, Field } from "formik";
interface SearchBarProps {
  onSubmit: (title: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (values: { query: string }) => {
    const title = values.query;
    if (title.trim() === "") {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(title);
  };
  const initialFormValues = {
    query: "",
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {" "}
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
          {() => (
            <Form className={styles.form}>
              <Field
                className={styles.input}
                type="text"
                name="query"
                autoComplete="off"
                placeholder="Search movies..."
                autoFocus
              />
              <button className={styles.button} type="submit">
                Search
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </header>
  );
}
