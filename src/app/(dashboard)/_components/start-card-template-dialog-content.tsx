// src/app/(dashboard)/_components/start-card-template-dialog-content.tsx

import {Separator} from "@/components/ui/separator";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {Link} from 'react-router-dom';
import {ScrollArea} from "@/components/ui/scroll-area";


const StartCardTemplateDialogContent = () => {
    const __html = `<div class="TemplateDocViewer-module_content_jE3Dj">
<div class="TemplateDocViewer-module_title_lmsM-"><h1 id="article-title" class="index-module_articleTitle_VJTLJ doc-article-title">会议记录</h1></div><div class="yuque-doc-content" data-df="lake" style="position: relative;"><div><div class="ne-viewer lakex-yuque-theme-light ne-typography-classic ne-paragraph-spacing-relax ne-viewer-layout-mode-fixed" data-viewer-mode="normal" id="ua2fe"><div class="ne-viewer-header"><button type="button" class="ne-ui-exit-max-view-btn" style="background-image:url(https://gw.alipayobjects.com/zos/bmw-prod/09ca6e30-fd03-49ff-b2fb-15a2fbd8042a.svg)">返回文档</button></div><div class="ne-viewer-body"><ne-alert-hole id="u7924bb34" data-lake-id="u7924bb34"><ne-alert ne-alert-type="tips"><ne-p id="u7740cfd4" data-lake-id="u7740cfd4"><ne-text id="u26837188">参会人：@</ne-text><ne-text id="u2079b669" ne-bg-color="#F5F5F5" style="color: rgb(140, 140, 140); background-color: rgb(245, 245, 245);">提及</ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-p><ne-p id="ufb42cf9d" data-lake-id="ufb42cf9d"><ne-text id="udbcc9bde">会议时间：2022-01-20</ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-p><ne-p id="uca0821be" data-lake-id="uca0821be"><ne-text id="ua06ee8d8">会议地点：6 号会议室</ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-p></ne-alert></ne-alert-hole><ne-h2 id="e2CMG" data-lake-id="e2CMG"><ne-heading-ext></ne-heading-ext><ne-heading-content><ne-text id="u32e4cc08">会前材料 </ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-heading-content></ne-h2><ne-quote id="u51be019a" data-lake-id="u51be019a"><ne-p id="ue8814ccf" data-lake-id="ue8814ccf"><ne-text id="ua121896c">不开没有准备的会。基于材料提前异步沟通、可以给会议带来惊人的提效。</ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-p></ne-quote><ne-hole id="u8da83fda" data-lake-id="u8da83fda" class="ne-spacing-all"><ne-card data-card-name="yuque" data-card-type="block" id="tGV8e" data-event-boundary="card" class=""><div class="ne-card-container" data-alias="card"><div class="ne-yuque-doc-card-view ne-yuque-doc-" data-testid="ne-yuque-doc-card-view"><img class="ne-yuque-doc-card-view-bg" src="https://cdn.nlark.com/yuque/0/2022/jpeg/519985/1646826377486-b65b60ff-5e23-4326-b494-aff18aff657f.jpeg?x-oss-process=image%2Fquality%2Cq_10"><a href="https://www.yuque.com/templates/ye52sh/fxrz8f" target="_blank"><div class="ne-yuque-doc-detail"><div class="ne-yuque-doc-content"><img class="ne-yuque-doc-icon" src="https://cdn.nlark.com/yuque/0/2022/jpeg/519985/1646826377486-b65b60ff-5e23-4326-b494-aff18aff657f.jpeg?x-oss-process=image%2Fquality%2Cq_10"><div class="ne-yuque-doc-body"><div class="ne-yuque-doc-title" data-testid="ne-yuque-doc-title">📑 产品需求文档</div><div class="ne-yuque-doc-desc" data-testid="ne-yuque-doc-desc">变更记录记录每次修订的内容，方便追溯。版本号作者修订内容发布日期1.1...去除需求 1.0，增加需求 3.02022-01-301.0...发布 prd 1.0 需求宣讲2021-12-311. 背景介绍1.1 业务背景对本次项目的背景以及目标进行描述，让产研团队了解本需求的价值和收益。1....</div><div class="ne-yuque-doc-belong" data-testid="ne-yuque-doc-belong">官方模板（新）</div></div></div></div></a></div></div></ne-card></ne-hole><ne-h2 id="e8uyE" data-lake-id="e8uyE"><ne-heading-ext></ne-heading-ext><ne-heading-content><ne-text id="u8c4c63dc">会议议题</ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-heading-content></ne-h2><ne-quote id="u9133906a" data-lake-id="u9133906a"><ne-p id="u21572368" data-lake-id="u21572368"><ne-text id="udfecd9cf">简要记录本次会议的主要议题讨论。</ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-p></ne-quote><ne-uli index-type="0"><ne-uli-i><span class="ne-list-symbol"><span>●</span></span></ne-uli-i><ne-uli-c class="ne-uli-content" id="ua8475aeb" data-lake-id="ua8475aeb"><ne-text id="u7afb27c9">议题1...</ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-uli-c></ne-uli><ne-uli index-type="0"><ne-uli-i><span class="ne-list-symbol"><span>●</span></span></ne-uli-i><ne-uli-c class="ne-uli-content" id="uef2a37f1" data-lake-id="uef2a37f1"><ne-text id="u3c08edbb">议题2...</ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-uli-c></ne-uli><ne-uli index-type="0"><ne-uli-i><span class="ne-list-symbol"><span>●</span></span></ne-uli-i><ne-uli-c class="ne-uli-content" id="u694eeca8" data-lake-id="u694eeca8"><ne-text id="uc98be337">议题3...</ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-uli-c></ne-uli><ne-h2 id="SRCky" data-lake-id="SRCky"><ne-heading-ext></ne-heading-ext><ne-heading-content><ne-text id="u826e5faf">会议结论</ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-heading-content></ne-h2><ne-quote id="u75cc57d8" data-lake-id="u75cc57d8"><ne-p id="u92d9c98d" data-lake-id="u92d9c98d"><ne-text id="uf4d42bb8">不开没有结论的会。哪怕“方案取消”或“下次再议”，也是结论的一种。</ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-p></ne-quote><ne-uli index-type="0"><ne-uli-i><span class="ne-list-symbol"><span>●</span></span></ne-uli-i><ne-uli-c class="ne-uli-content" id="u749ba5e0" data-lake-id="u749ba5e0"><ne-text id="u05c95133">结论1...</ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-uli-c></ne-uli><ne-uli index-type="0"><ne-uli-i><span class="ne-list-symbol"><span>●</span></span></ne-uli-i><ne-uli-c class="ne-uli-content" id="u593d4b11" data-lake-id="u593d4b11"><ne-text id="ub13147c8">结论2...</ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-uli-c></ne-uli><ne-uli index-type="0"><ne-uli-i><span class="ne-list-symbol"><span>●</span></span></ne-uli-i><ne-uli-c class="ne-uli-content" id="u2d59f398" data-lake-id="u2d59f398"><ne-text id="u51291081">结论3...</ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-uli-c></ne-uli><ne-h2 id="b993v" data-lake-id="b993v"><ne-heading-ext></ne-heading-ext><ne-heading-content><ne-text id="ub8a75315">执行计划</ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-heading-content></ne-h2><ne-quote id="ue156e5e8" data-lake-id="ue156e5e8"><ne-p id="u657a07c1" data-lake-id="u657a07c1"><ne-text id="u571e37bd">设置后续待办任务，可使用 @人分配执行人。</ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-p></ne-quote><ne-tli index-type="0"><ne-tli-i class="ne-checkbox  ne-checkbox-cursor-default"><span class="ne-checkbox-inner"></span></ne-tli-i><ne-tli-c class="ne-oli-content" id="u877e3580" data-lake-id="u877e3580"><ne-text id="u9e5f650c">待办任务1 </ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-tli-c></ne-tli><ne-tli index-type="0"><ne-tli-i class="ne-checkbox  ne-checkbox-cursor-default"><span class="ne-checkbox-inner"></span></ne-tli-i><ne-tli-c class="ne-oli-content" id="u76c48bd1" data-lake-id="u76c48bd1"><ne-text id="u5f30fd4e">待办任务2  </ne-text><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-tli-c></ne-tli><ne-p id="ub1dc1cf9" data-lake-id="ub1dc1cf9"><span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-p></div><div class="ne-inner-overlay-container"></div></div>
<div style="height: 0px; overflow: hidden;">​</div></div></div></div>`

    return (
        <div className={`flex max-h-[80vh]`}>
            <div className={`prose max-h-[80vh] overflow-auto w-[70%]`}>
                <div className={``} dangerouslySetInnerHTML={{__html}}/>
            </div>
            <div className={`w-[30%] items-center flex flex-col gap-y-1`}>
                <span className={`w-full text-left px-2 pt-2`}>模板中心</span>
                <Separator className={`m-2`}/>
                <Link to={`/`} className={`mb-2 w-full px-2`}>
                    <Button
                        className={`text-white w-full font-bold hover:bg-green-700 bg-green-500`}>
                        使用此模板
                    </Button>
                </Link>
                <Tabs className={`mb-2 w-full px-2`} defaultValue="recommend">
                    <TabsList>
                        <TabsTrigger value="recommend">推荐</TabsTrigger>
                        <TabsTrigger value="me">我的</TabsTrigger>
                    </TabsList>
                    <TabsContent value="recommend">
                        <ScrollArea className="h-[480px] rounded-md border p-4">
                            <div>团队协作</div>
                            <div>个人管理</div>
                            <div>基础模板</div>
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="me">
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
        ;
};

export default StartCardTemplateDialogContent;