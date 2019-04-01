import * as React from 'react'
import {mount} from 'enzyme'
import Search from '../pages/index'

describe('Pages', () => {
  describe('Search', () => {
    it('input fields should be filled correctly', () => {
      const wrap = mount(<Search/>)
      const busStop = '123';

      const searchInput = wrap.find('#busStop');
      searchInput.value = busStop;
      expect(searchInput.value).toBe('123');
  });
  })
})
