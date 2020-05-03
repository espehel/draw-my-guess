import { CreateSpaceRequest } from '../../types/api';
import { Space } from '../../types/models';

export const createSpace = async (body: CreateSpaceRequest): Promise<Space> => {
  const response = await fetch('space/create', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};
