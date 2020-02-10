import React from "react";
import { shallow } from "enzyme";
import { CollectionItem } from "./collection-item.component.jsx";

describe("CollectionItem component", () => {
  let wrapper;
  let mockAddItem;
  let mockName = "Red hat";
  let mockPrice = "99";
  let mockImageUrl = "www.testimage.com";
  beforeEach(() => {
    mockAddItem = jest.fn();
    let mockProps = {
      item: {
        name: mockName,
        price: mockPrice,
        imageUrl: mockImageUrl
      },
      addItem: mockAddItem
    };
    wrapper = shallow(<CollectionItem {...mockProps} />);
  });

  it("should render CollectionItem compoenent", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should call addItem when "add to cart" button in clicked', () => {
    wrapper.find("CustomButton").simulate("click");
    expect(mockAddItem).toHaveBeenCalled();
  });

  it("should render name prop in footer", () => {
    expect(wrapper.find(".name").text()).toEqual(mockName);
  });

  it("should render price prop in footer", () => {
    expect(wrapper.find(".price").text()).toEqual(mockPrice);
  });

  it("should pass imageUrl in image container", () => {
    expect(wrapper.find(".image").get(0).props.style).toHaveProperty(
      "backgroundImage",
      `url(${mockImageUrl})`
    );
  });
});
