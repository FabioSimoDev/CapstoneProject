import { formatDistanceToNowStrict, lightFormat } from "date-fns";

export const calculateDistanceToNow = (dateString) => {
  return formatDistanceToNowStrict(Date.parse(dateString), {
    includeSeconds: true,
    addSuffix: false
  });
};

export const formatDate = (dateString) => {
  return lightFormat(Date.parse(dateString), "yyyy-MM-dd");
};
