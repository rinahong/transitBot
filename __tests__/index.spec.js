import * as React from 'react'
import {mount} from 'enzyme'
import Index from '../pages/index'
import Search from '../pages/search'
import Alarm from '../pages/alarm'
import History from '../pages/History'
describe('Pages', () => {
  describe('Index', () => {
    it('should render without throwing an error', function () {
      const wrap = mount(<Index/>)
      expect(wrap.find('h1').text()).toBe('Welcome to Transit Bot')
    })
  }),
  describe('Search', () => {
    it('input fields should be filled correctly', () => {
      const wrap = mount(<Search/>)
      const busStop = '123';

      const searchInput = wrap.find('#busStop');
      searchInput.value = busStop;
      expect(searchInput.value).toBe('123');
    });
  }),
  describe('Alarm', () => {
    it('input fields should be filled correctly', () => {
      const wrap = mount(<Alarm/>)
      const busStop = '123';

      const busStopInput = wrap.find('#busStop');
      busStopInput.value = busStop;
      expect(busStopInput.value).toBe('123');
    });
  }),
  describe('History', () => {
    it('Display history if exists', async () => {
      const props = await History.getInitialProps()
      const wrap = mount(<History/>)
      expect(wrap.find('h1').text()).toBe('Your Search History')
      expect(wrap.find('ul').text()).toBe('')


    });
  })
})
