import { getItunes, getSingleItune } from '../ituneApi';
import { getApiClient } from '@utils/apiUtils';
import MockAdapter from 'axios-mock-adapter';

describe('ituneApi tests', () => {
  const artistName = 'eminem';
  const trackId = 'abc123';
  it('should make an api call to "/search?term=" ', async () => {
    const mock = new MockAdapter(getApiClient('itune').axiosInstance);
    const data = [
      {
        resultCount: 50,
        results: [{ artistName }]
      }
    ];
    mock.onGet(`/search?term=${artistName}`).reply(200, data);
    const res = await getItunes(artistName);
    expect(res.data).toEqual(data);
  });
  it('should make an api call to "/lookup?id=" ', async () => {
    const mock = new MockAdapter(getApiClient('itune').axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ trackId }]
      }
    ];
    mock.onGet(`/lookup?id=${trackId}`).reply(200, data);
    const res = await getSingleItune(trackId);
    expect(res.data).toEqual(data);
  });
});
