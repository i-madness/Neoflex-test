export default interface ApplicationError {
  text: string;
  jsErr?: Error; // JS Error object, in case if we implement error handler like try {...} catch(jsErr) { dispatch({..., jsErr}) }
}

export const wrap = (text: string): ApplicationError => ({ text });
