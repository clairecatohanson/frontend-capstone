import { useEffect, useState } from "react"
import { CategoryForm } from "./CategoryForm"
import { getCategories } from "../../managers/categoryManager"
// import "./Categories.css"
import { CategoryList } from "./CategoryList"

export const Categories = ({ user, categories, setCategories }) => {
  const [publicCategories, setPublicCategories] = useState([])
  const [privateCategories, setPrivateCategories] = useState([])

  const publicHeading = "Ready to use categories:"
  const privateHeading = "Custom categories made by you:"

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res)
    })
  }, [setCategories])

  useEffect(() => {
    const publicToAll = categories.filter((c) => c.userId === 100)
    setPublicCategories(publicToAll)
    const userCategories = categories.filter((c) => c.userId === user.id)
    setPrivateCategories(userCategories)
  }, [categories, user])

  return (
    // Global Container
    <div className="min-h-screen bg-gray-100">
      {/* Heading Container */}
      <div className="mb-2 text-center md:text-left w-full bg-gray-200 p-6">
        <h2 className="text-4xl mb-2">Categories</h2>
        <h3 className="text-xl">
          Public and private categories for grouping your expenses
        </h3>
      </div>
      {/* Card Container */}
      <div className="flex flex-col space-y-4 items-center lg:flex-row lg:justify-center lg:items-start lg:space-y-0 lg:space-x-8 lg:max-w-[1500px] lg:mx-auto mt-16 p-4">
        <div className="flex justify-center w-11/12 lg:w-1/3">
          <CategoryList
            filteredCategories={publicCategories}
            sectionHeading={publicHeading}
            categories={categories}
            setCategories={setCategories}
          />
        </div>
        <div className="flex justify-center w-11/12 lg:w-1/3">
          <CategoryList
            filteredCategories={privateCategories}
            sectionHeading={privateHeading}
            categories={categories}
            setCategories={setCategories}
          />
        </div>
        <div className="flex justify-center w-11/12 lg:w-1/3">
          <div className="w-4/5 md:w-1/2 lg:w-full">
            <CategoryForm
              user={user}
              categories={categories}
              setCategories={setCategories}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
