import { formatDistanceToNowStrict } from "date-fns";

export const calculateDistanceToNow = (dateString) => {
  return formatDistanceToNowStrict(Date.parse(dateString), {
    includeSeconds: true,
    addSuffix: false
  });
};
