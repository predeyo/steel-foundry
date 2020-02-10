import React from "react";
import { shallow } from "enzyme";
import { CheckoutItem } from "./checkout-item.component.jsx";

describe("CheckoutItem component", () => {
  let wrapper;
  let mockCartItem = {
    name: "Red hat",
    price: "99",
    imageUrl: "www.testimage.com"
  };
  let mockAddItem;
  let mockRemoveItem;
  let mockClearItem;
  beforeEach(() => {
    mockAddItem = jest.fn();
    mockRemoveItem = jest.fn();
    mockClearItem = jest.fn();
    let mockProps = {
      cartItem: mockCartItem,
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      clearItem: mockClearItem
    };
    wrapper = shallow(<CheckoutItem {...mockProps} />);
  });

  it("should render CheckoutItem component", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("shold call addItem when increase item count is clicked", () => {
    wrapper.find(".add-item").simulate("click");

    expect(mockAddItem).toHaveBeenCalled();
  });

  it("shold call removeItem when decrese item count is clicked", () => {
    wrapper.find(".remove-item").simulate("click");

    expect(mockRemoveItem).toHaveBeenCalled();
  });

  it("shold call clearItem when clear-button is clicked", () => {
    wrapper.find(".clear-button").simulate("click");

    expect(mockClearItem).toHaveBeenCalled();
  });
});
