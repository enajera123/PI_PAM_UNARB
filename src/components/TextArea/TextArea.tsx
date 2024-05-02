import { TextAreaProps } from "./type";

const TextArea = ({label, placeholder, rows} : TextAreaProps) => {
  return (
    <>
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <textarea
        id="message"
        rows={rows}
        className="block p-2.5 w-full text-sm text-white bg-dark-gray rounded-lg border border-white dark:bg-dark-gray dark:border-white dark:placeholder-white dark:text-white"
        placeholder={placeholder}
      ></textarea>
    </>
  );
};

export default TextArea;
