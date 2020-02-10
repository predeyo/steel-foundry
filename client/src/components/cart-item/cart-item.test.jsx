import React from "react";
import { shallow } from "enzyme";
import CartItem from "./cart-item.component.jsx";

describe("CartItem component", () => {
  let wrapper;
  let mockName = "Purple leggings";
  let mockPrice = 104;
  let mockImageUrl = "www.imagetest.com";
  let mockQuantity = 99;
  let mockProps;
  beforeEach(() => {
    mockProps = {
      item: {
        name: mockName,
        price: mockPrice,
        imageUrl: mockImageUrl,
        quantity: mockQuantity
      }
    };
    wrapper = shallow(<CartItem {...mockProps} />);
  });

  it("should render CartItem component", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
